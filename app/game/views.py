from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect


def game(request):
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

    print(state)

    return render(request=request, template_name="game/gamefield.html", context={"field": state, "alphabet": ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'], "numbers": [0,1,2,3,4,5,6,7,8,9]})