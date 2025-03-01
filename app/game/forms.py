"""
стан буде перевірятись кожен раз після встановлення корабля
"""
from django import forms
from core.models import GameState
import json

SHIP_CELLS_AMOUNT = 23

def ship_cells_amount_checker(state, ship_amount):
    if ship_amount == 0:
        return True
    return False


class StateForm(forms.ModelForm):
    class Meta:
        model = GameState
        fields = ["game_state_1", "game_state_2", "players_step", "ship_amount", "player_1", "player_2"]

    def clean(self):
        """
        Here you should make all data validation

        this method is called in .is_valid()

        .is_valid called each time when form is saved

        if we do not match validation criteria - throw ValidationError
        """
        #
        # https://docs.djangoproject.com/en/5.1/ref/forms/validation/
        #

        cleaned_data = super().clean()

        state = json.loads(cleaned_data.get("game_state_1", "[{}]"))
        current_step = json.loads(cleaned_data.get("players_step", "{}"))
        ship_amount = cleaned_data.get("ship_amount", 0)
        current_amount = 0
        if not hasattr(current_step, "__len__"):
            raise forms.ValidationError("There is no len for current_step.")
        for a in range(len(current_step)):
            try:
                if (
                    state[current_step[a]-12]["is_clicked"] == False and state[current_step[a]-11]["is_clicked"] == False and state[current_step[a]-10]["is_clicked"] == False
                    and state[current_step[a]-1]["is_clicked"] == False and state[current_step[a]+1]["is_clicked"] == False and state[current_step[a]+10]["is_clicked"] == False
                    and state[current_step[a]+11]["is_clicked"] == False and state[current_step[a]+12]["is_clicked"] == False
                ):
                    pass
                else:
                    raise forms.ValidationError("This ship place is bad.")
            except:
                try:
                    if (
                        state[current_step[a]-12]["is_clicked"] == False and state[current_step[a]-11]["is_clicked"] == False and state[current_step[a]-10]["is_clicked"] == False
                        and state[current_step[a]-1]["is_clicked"] == False and state[current_step[a]+1]["is_clicked"] == False
                    ):
                        pass
                    else:
                        raise forms.ValidationError("This ship place is bad.")
                except:
                    if (
                            state[current_step[a] - 12]["is_clicked"] == False and state[current_step[a] - 11]["is_clicked"] == False and state[current_step[a] - 10]["is_clicked"] == False
                            and state[current_step[a] - 1]["is_clicked"] == False
                    ):
                        print("wwr233333434")
                    else:
                        raise forms.ValidationError("This ship place is bad.")
        ship_amount -= len(current_step)
        #statej = json.dumps(state, indent=4)

        if ship_amount < 0:
            raise forms.ValidationError("To many ships")
        cleaned_data.update({
            "ship_amount": ship_amount,
        })
        return cleaned_data

# class MidGameForm(forms.ModelForm):
#     class Meta:
#         model = GameState
#         fields = ["game_state", "players_hit", "ships_remain", "player"]
#
#     cleaned_data = super().clean()
#     state = json.loads(cleaned_data.get("game_state", "{}"))
#     hit = json.loads(cleaned_data.get("players_hit", "{}"))
#
#
#     for a in range(len(state)):
#         if state[a].is_hit is False and hit == a:
#             pass
#             #return cleaned_data
