# Generated by Django 3.2.16 on 2025-01-25 07:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_auto_20250125_0921'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gamelist',
            name='player_1',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='players_1_game_list', related_query_name='player_1_game_list', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='gamelist',
            name='player_2',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='players_2_game_list', related_query_name='player_2_game_list', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='gamestate',
            name='player_1',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='players_1_game_state', related_query_name='player_1_game_state', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='gamestate',
            name='player_2',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='players_2_game_state', related_query_name='player_2_game_state', to=settings.AUTH_USER_MODEL),
        ),
    ]
