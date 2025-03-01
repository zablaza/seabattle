from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from django.conf import settings
class User(AbstractUser):
    objects = UserManager()

class GameState(models.Model):
    game_state_1 = models.TextField(default={})
    game_state_2 = models.TextField(default={})
    players_step = models.TextField()
    ship_amount = models.IntegerField()
    player_1 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name="players_1_game_state", related_query_name="player_1_game_state")
    player_2 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name="players_2_game_state", related_query_name="player_2_game_state")
    time = models.DateTimeField(null=True, blank=True)

class GameList(models.Model):
    start_game = models.DateTimeField(null=True, blank=True, auto_now_add=True)
    end = models.DateTimeField(null=True, blank=True)
    status = models.IntegerField()
    player_1 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name="players_1_game_list", related_query_name="player_1_game_list")
    player_2 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name="players_2_game_list", related_query_name="player_2_game_list")