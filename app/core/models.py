from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from django.conf import settings
class User(AbstractUser):
    objects = UserManager()

class GameInfo(models.Model):
    END_GAME_STATUS = 0
    ACTIVE_GAME_STATUS = 1
    game_status_choices = ((END_GAME_STATUS, "end game"), (ACTIVE_GAME_STATUS, "active game"))
    player_1 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name="players_1_games", related_query_name="player_1_game")
    player_2 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name="players_2_games", related_query_name="player_2_game", null=True, default=None)
    game_status = models.IntegerField(choices=game_status_choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
class GameState(models.Model):
    game_info = models.ForeignKey(GameInfo, on_delete=models.DO_NOTHING, related_name="game_states", related_query_name="game_state", null=True, default=None)
    game_state_1 = models.TextField(default={})
    game_state_2 = models.TextField(default={})
    players_step = models.TextField()
    ship_amount = models.IntegerField()
    player_1 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name="players_1_game_state", related_query_name="player_1_game_state")
    player_2 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name="players_2_game_state", related_query_name="player_2_game_state")
    time = models.DateTimeField(null=True, blank=True)

class MidGame(models.Model):
    game_info = models.ForeignKey(GameInfo, on_delete=models.DO_NOTHING, related_name="mid_games", related_query_name="mid_game", null=True, default=None)
    game_state = models.TextField(default={})
    player = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name="player_mid_games", related_query_name="player_mid_game")
    players_hit = models.TextField()
    ships_remain = models.IntegerField()
    time = models.DateTimeField(null=True, blank=True)

class GameList(models.Model):
    start_game = models.DateTimeField(null=True, blank=True, auto_now_add=True)
    end = models.DateTimeField(null=True, blank=True)
    status = models.IntegerField()
    player_1 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name="players_1_game_list", related_query_name="player_1_game_list")
    player_2 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name="players_2_game_list", related_query_name="player_2_game_list")