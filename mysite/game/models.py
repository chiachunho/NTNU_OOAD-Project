import base64
import hashlib
from datetime import datetime
from django.db import models
from django.urls import reverse
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from authentication.models import CustomUser
from saboteur import GameController, GameState


class GameRoom(models.Model):
    class StatusType(models.TextChoices):
        ORGANIZE = 'organize'
        PLAYING = 'playing'
        END = 'end'

    HASH_SALT = 'HELLO'
    lobby_socket_group_name = 'lobby'

    created_at = models.DateTimeField(auto_now_add=True)
    admin = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, related_name='admin')
    volume = models.SmallIntegerField(default=4)
    players = models.ManyToManyField(CustomUser, through='PlayerData', through_fields=('room', 'player'), blank=True)
    status = models.CharField(max_length=8, choices=StatusType.choices, default=StatusType.ORGANIZE)
    permanent_url = models.CharField(max_length=6, default='______')
    game_data = models.JSONField(default=dict)

    def save(self, *args, **kwargs):
        if self.permanent_url == '______':
            new_id = str(datetime.now)
            while True:
                new_id = base64.b64encode(hashlib.md5((new_id + self.HASH_SALT).encode('utf-8')).digest(),
                                          altchars=b"ab")[:6].decode("utf-8")
                if not GameRoom.objects.filter(permanent_url=new_id).exists():
                    break
            self.permanent_url = new_id
        else:
            pass

        super().save(*args, **kwargs)  # Call the "real" save() method.

        self._send_update_to_game_room()
        self._send_update_to_lobby()

    def delete(self, *args, **kwargs):
        self._send_delete_to_lobby()
        super().delete(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('game:room', args=[self.permanent_url])

    def __str__(self):
        return f'{self.permanent_url}'

    def room_group_name(self):
        return f'game_{self.permanent_url}'

    def join_room(self, username):
        user = CustomUser.objects.get(username=username)
        can_speak = False

        if self.status == GameRoom.StatusType.ORGANIZE:
            if len(self.players.all()) < self.volume or user in self.players.all():
                self.players.add(user)
                can_speak = True

                if self.admin is None:
                    self.admin = user

        elif self.status == GameRoom.StatusType.PLAYING or self.status == GameRoom.StatusType.END:
            if user in self.players.all():
                can_speak = True

        self.save()
        return can_speak

    def leave_room(self, username):
        if self.status == GameRoom.StatusType.ORGANIZE:
            user = CustomUser.objects.get(username=username)
            self.players.remove(user)
            if len(self.players.all()) > 0:
                if self.admin == user:
                    self.admin = self.players.all()[0]
                self.save()
            else:
                self.delete()

    def kick_player(self, username):
        user = CustomUser.objects.get(username=username)
        self.players.remove(user)
        self.save()

    def change_status(self, status):
        self.status = status
        if status == GameRoom.StatusType.PLAYING:
            # send delete alert to lobby
            self._send_delete_to_lobby()
            # create new n-player GameController
            self._init_game_data()
            self.save()

        elif status == GameRoom.StatusType.END:
            controller = self._get_controller()

            for player in controller.player_list:
                playerData = PlayerData.objects.get(room=self, player__username=player.id)
                playerData.point = player.point
                playerData.save()

            self.save()

    def state_control(self, card_id, position, rotate, action):
        controller = self._get_controller()
        # play card and get feedback
        return_msg = controller.state_control(card_id=card_id, position=position, rotate=rotate, act_type=action)

        # save result
        self.game_data = controller.to_dict()
        self.save()

        # determine end game or not
        if controller.game_state == GameState.end_game:
            self.change_status(GameRoom.StatusType.END)

        return return_msg

    def _init_game_data(self):
        controller = GameController.from_scratch(self._get_player_list())
        self.game_data = controller.to_dict()

    def _get_player_list(self):
        return [player.username for player in self.players.all()]

    def _get_controller(self):
        return GameController(**self.game_data)

    def _send_update_to_lobby(self):
        channel_layer = get_channel_layer()
        # Send update notification to lobby
        if self.status == self.StatusType.ORGANIZE:
            async_to_sync(channel_layer.group_send)(
                self.lobby_socket_group_name, {
                    'type': 'update_room',
                    'room_name': self.permanent_url
                }
            )

    def _send_delete_to_lobby(self):
        channel_layer = get_channel_layer()
        # Send update notification to lobby
        async_to_sync(channel_layer.group_send)(
            self.lobby_socket_group_name, {
                'type': 'delete_room',
                'room_name': self.permanent_url
            }
        )

    def _send_update_to_game_room(self):
        channel_layer = get_channel_layer()
        # Send update notification to room group
        async_to_sync(channel_layer.group_send)(
            self.room_group_name(), {
                'type': 'update_room',
            }
        )


class PlayerData(models.Model):
    room = models.ForeignKey(GameRoom, on_delete=models.CASCADE)
    player = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    point = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.room} {self.player}'
