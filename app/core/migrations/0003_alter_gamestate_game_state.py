# Generated by Django 3.2.16 on 2024-09-21 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_gamestate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gamestate',
            name='game_state',
            field=models.TextField(),
        ),
    ]
