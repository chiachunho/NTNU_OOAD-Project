#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Card.py
# @Author : DannyLeee (dannylee94049@gmail.com)
# @Link   : https://github.com/DannyLeee
# @Date   : 2021/4/16 下午11:02:05

from util import *

"""
    card
    the abstract class of all cards
    card number define:
        road: 0 ~ 43
            0:          ╬ [1, 1, 1, 1, 1] start road
            1:          ╬ [1, 1, 1, 1, 1] end road(gold)
            2:          ╔ [1, 1, 1, 1, 1] end road(rock)
            3:          ╔ [1, 1, 1, 1, 1] end road(rock)
            4 ~ 7:      ║ [1, 1, 0, 1, 0]
            8 ~ 12:     ╠ [1, 1, 1, 1, 0]
            13 ~ 17:    ╬ [1, 1, 1, 1, 1]
            18 ~ 21:    ╔ [1, 0, 1, 1, 0]
            22 ~ 26:    ╗ [1, 0, 0, 1, 1]
            27:         ╥ [0, 0, 0, 1, 0]
            28:           [0, 1, 0, 1, 1]
            29:           [0, 1, 1, 1, 1]
            30:           [0, 0, 1, 1, 0]
            31:           [0, 0, 0, 1, 1]
            32:         ╡ [0, 0, 0, 0, 1]
            33 ~ 37:    ╩ [1, 1, 1, 0, 1]
            38 ~ 40:    ═ [1, 0, 1, 0, 1]
            41:         ╫ [0, 1, 0, 1, 0]
            42:           [0, 1, 1, 0, 1]
            43:         ╪ [0, 0, 1, 0, 1]
        
        action: 44 ~ 70
            44 ~ 48:    miner_lamp(3 break)
            49 ~ 53:    minecart(3 break)
            54 ~ 58:    mine_pick(3 break)
            59:         mine_pick + minecart
            60:         mine_lamp + minecart
            61:         mine_pick + mine_lamp
            62 ~ 64:    rocks
            65 ~ 70:     map

"""
class Card():
    # -1 as empty card place
    def __init__(self, card_no=-1):
        self.card_no = card_no

    """
        output json format representation with Str
    """
    def __repr__(self):
        repr_ = {
            "card_no": self.card_no
        }
        return json.dumps(repr_)

    def __eq__(self, other):
        return self.card_no == other.card_no

"""
    road type for road card
"""
class Road_Type(IntEnum):
    start = 0
    normal = 1
    end = 2
    
"""
    road card
    connected: lsit of connection (middel, top, right, down, left) 0 for not connect (List)
"""
class Road(Card):
    def __init__(self, card_no=-1, rotate: int=0, road_type: Road_Type=Road_Type.normal, connected: list=None):
        super().__init__(card_no=card_no)
        self.rotate = rotate
        self.road_type = road_type
        self.connected = self.get_connection()

    """
        output json format representation with Str
    """
    def __repr__(self):
        repr_ = super().__repr__()
        repr_ = json.loads(repr_)
        repr_.update({
            "rotate": self.rotate,
            "road_type": int(self.road_type)
        })
        return json.dumps(repr_) 

    """
        set the road connection for road connection checking
        :returns connected: the connection of the road (List)
    """
    def get_connection(self):
        connected = [0] * 5
        if self.card_no >= 0 and self.card_no <= 3 or \
            (self.card_no >= 13 and self.card_no <= 17):
            connected = [1] * 5
        elif self.card_no >= 18 and self.card_no <= 21:
            connected = [1, 0, 1, 1, 0]
        elif self.card_no >= 22 and self.card_no <= 26:
            connected = [1, 0, 0, 1, 1]
        elif self.card_no >= 4 and self.card_no <= 7:
            connected = [1, 1, 0, 1, 0]
        elif self.card_no >= 8 and self.card_no <= 12:
            connected = [1, 1, 1, 1, 0]
        elif self.card_no == 27:
            connected = [0, 0, 0, 1, 0]
        elif self.card_no == 28:
            connected = [0, 1, 0, 1, 1]
        elif self.card_no == 29:
            connected = [0, 1, 1, 1, 1]
        elif self.card_no == 30:
            connected = [0, 0, 1, 1, 0]
        elif self.card_no == 31:
            connected = [0, 0, 0, 1, 1]
        elif self.card_no == 32:
            connected = [0, 0, 0, 0, 1]
        elif self.card_no >= 33 and self.card_no <= 37:
            connected = [1, 1, 1, 0, 1]
        elif self.card_no >= 38 and self.card_no <= 40:
            connected = [1, 0, 1, 0, 1]
        elif self.card_no == 41:
            connected = [0, 1, 0, 1, 0]
        elif self.card_no == 42:
            connected = [0, 1, 1, 0, 1]
        elif self.card_no == 43:
            connected = [0, 0, 1, 0, 1]

        if self.rotate:
            connected[1], connected[3] = connected[3], connected[1]
            connected[2], connected[4] = connected[4], connected[2]

        return connected

"""
    action type for action card
"""
class Action_Type(IntEnum):
    miner_lamp = 0
    minecart = 1
    mine_pick = 2
    rocks = 3
    map = 4

"""
    action card
"""
class Action(Card):
    def __init__(self, card_no=-1, action_type=None, is_break=None):
        super().__init__(card_no=card_no)
        if action_type is None:
            self.action_type = self.get_action()
        else:
            self.action_type = action_type
        if is_break is None:
            self.is_break = self.get_break()
        else:
            self.is_break = is_break
    
    """
        output json format representation with Str
    """
    def __repr__(self):
        repr_ = super().__repr__()
        repr_ = json.loads(repr_)
        repr_.update({
            "action_type": self.action_type,
            "is_break": self.is_break
        })
        return json.dumps(repr_)

    def get_action(self):
        if 44 <= self.card_no and self.card_no <= 48:
            return Action_Type.miner_lamp
        elif 49 <= self.card_no and self.card_no <= 53:
            return Action_Type.minecart
        elif 54 <= self.card_no and self.card_no <= 58:
            return Action_Type.mine_pick
        elif self.card_no == 59:
            return [Action_Type.mine_pick, Action_Type.minecart]
        elif self.card_no == 60:
            return [Action_Type.miner_lamp, Action_Type.minecart]
        elif self.card_no == 61:
            return [Action_Type.mine_pick, Action_Type.miner_lamp]
        elif 62 <= self.card_no and self.card_no <= 64:
            return Action_Type.rocks
        elif 65 <= self.card_no and self.card_no <= 70:
            return Action_Type.map

    def get_break(self):
        if 44 <= self.card_no and self.card_no <= 46 \
            or 49 <= self.card_no and self.card_no <= 51 \
            or 54 <= self.card_no and self.card_no <= 56:
            return True
        return False

"""
    the card can destroy normal road
"""
class Rocks(Action):
    def __init__(self, card_no=-1, action_type=Action_Type.rocks, is_break=False):
        super().__init__(card_no=card_no, action_type=action_type, is_break=is_break)
    
    def __repr__(self):
        return super().__repr__()

    def destroy_road(self,):
        pass

"""
    the card can peek gold(end road)
"""
class Map(Action):
    def __init__(self, card_no=-1, action_type=Action_Type.map, is_break=False):
        super().__init__(card_no=card_no, action_type=action_type, is_break=is_break)

    def __repr__(self):
        return super().__repr__()

    def peek_gold(self,):
        pass