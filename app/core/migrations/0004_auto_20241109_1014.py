# Generated by Django 3.2.16 on 2024-11-09 08:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_gamestate_game_state'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gamestate',
            name='game_state',
            field=models.JSONField(),
        ),
        migrations.AlterField(
            model_name='gamestate',
            name='players_step',
            field=models.TextField(),
        ),
    ]
