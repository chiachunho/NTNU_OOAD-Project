from django.shortcuts import render, redirect, get_object_or_404
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import GameRoom


# Create your views here.
def index(request):
    organize_rooms = GameRoom.objects.filter(status=GameRoom.StatusType.ORGANIZE)
    context = {
        'organize_rooms': organize_rooms
    }
    return render(request, 'game/index.html', context)


def create(request):
    new_room = GameRoom.objects.create()
    new_room.save()
    return redirect(new_room)


def room_view(request, room_name):
    game_room = get_object_or_404(GameRoom, permanent_url=room_name)
    if game_room.status == GameRoom.StatusType.ORGANIZE or request.user in game_room.players.all():
        context = {
            'room': game_room,
        }
        return render(request, 'game/room.html', context)
    else:
        return redirect('game:index')

