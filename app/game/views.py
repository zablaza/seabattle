from django.shortcuts import render, redirect

import json
from .forms import StateForm, ship_cells_amount_checker, MidGameForm, GameListForm
from core.models import GameState
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
import copy


def game(request):
    if request.user.is_authenticated == False:
        return redirect(reverse('account_app:login'))
    height = 11
    length = 11
    start_state = []

    for row in range(height):
        row_content = []
        for col in range(length):
            if row > 0 and col > 0:
                row_content.append({'display_value': ' ', 'index': str((row - 1) * (length - 1) + (col - 1))})
            elif row > 0 and col == 0:
                row_content.append({'display_value': row, 'index': str((row - 1) * (length - 1) + (col - 1))})
            else:
                row_content.append({'display_value': ' ', 'index': "x"})
        start_state.append(row_content)
    state = start_state

    alphabet = [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    for index, value in enumerate(state[0]):
        value['display_value'] = alphabet[index]

    # print(state, "stateeeeeeee")

    return render(request=request, template_name="game/canvasgamefield.html", context={"field": state, "alphabet": ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'], "numbers": [0,1,2,3,4,5,6,7,8,9]})

@login_required(login_url="/accounts/login/")
def ajax_request(request):

    if request.method == "POST":
        player_data = request.body
        try:
            player_data = json.loads(player_data)
        except json.JSONDecodeError:
            return JsonResponse(

                data={
                    "status": "fail",
                    "data": {
                        "payload_data": "Unable to covert payload into python type",
                        "status_code": 452,
                    }
                }
            )
        current_game_state = player_data[0]






        if current_game_state == 0:

            if len(player_data) != 4:
                print("ERROR: length of list is not 2!!!")
                return JsonResponse(

                    data={
                        "status": "fail",
                        "data": {
                            "payload_data": "Payload data has incorrect attribute amount. Expected 2, got {}".format(
                                len(player_data)),
                            "status_code": 453,
                        }
                    })
            ship_amount = player_data[3]
            field_state = player_data[1]
            step = player_data[2]




            form = StateForm({
                "game_state_1": json.dumps(field_state),
                "game_state_2": "{}",
                "players_step": json.dumps(step),
                "ship_amount": json.dumps(ship_amount),
                "player_1": request.user,
                "player_2": request.user,
                "current_game_state": current_game_state}
            )
            print(current_game_state)
            if form.is_valid():
                amount = form.cleaned_data.get("ship_amount")
                state = form.cleaned_data.get("game_state_1")
                # state = json.loads(state)
                if amount == 0:
                    # print(form.is_valid())
                    # respondd = 0
                    # for a in range(len(state)):
                    #     if state[a]["is_clicked"] is False and state[a]["is_active"] is True and step == state[a]["index"]:
                    #         print("yes")
                    #         respondd = "yes"
                    #     elif state[a]["is_clicked"] is True and state[a]["is_active"] is False:
                    #         print("no")
                    #         respondd = "no"
                    # state = json.dumps(state)
                    form_list = GameListForm({
                        "status": 1,
                        "player_1": request.user,
                        "player_2": request.user})
                    if form_list.is_valid():
                        form_list.save()
                    form.save()


                    #here must be enter to the next state of game
                    ship_cells_amount_checker(field_state, ship_amount)

                cleaned_data_2 = copy.copy(form.cleaned_data)
                cleaned_data_2["player_1"] = form.cleaned_data["player_1"].id
                cleaned_data_2["player_2"] = form.cleaned_data["player_2"].id
                return JsonResponse({
                    "status": "success",
                    "data": {
                        "payload_data": cleaned_data_2,  # <--- Same message as in form ValidationError (in raise)
                        "status_code": 200
                    }
                })
            else:
                print(form.errors)
                return JsonResponse(
                    #status of error. defaut http response status code, handled automatically by system
                    #status=400,
                    data={
                    "status": "fail",
                    "data": {
                        "payload_data": form.errors,  # <--- Same message as in form ValidationError (in raise)
                        "status_code": 3, # validation error
                    },
                })
        elif current_game_state == 1:
            play_hit = player_data[1]
            ships_remain = player_data[2]
            form_mid2 = MidGameForm({
                "players_hit": "1",
                "player": request.user,
                "state": current_game_state,
                "ships_remain": ships_remain
            })
            if form_mid2.is_valid():
                cleaned_d = copy.copy(form_mid2.cleaned_data)
                return JsonResponse({
                    "status": "success",
                    "data": {
                        "payload_data": cleaned_d,  # <--- Same message as in form ValidationError (in raise)
                        "status_code": 200
                    }
            })
    #print(request.POST, "post")
    # return render(request=request, template_name="game/canvasgamefield.html", context={"a": "qweqw"})

    # return JsonResponse({}, status=200)#redirect("game:qqq")
    return JsonResponse(
        status=405,
        data={
        "status": "fail",
        "data": {
            "GET": "Wrong request method"
        }
    })
