from . import views
from django.urls import include, path

app_name = 'game'

urlpatterns = [
    path('', views.game, name='qqq'),
    path('game_async/', views.ajax_request, name='aj')
]