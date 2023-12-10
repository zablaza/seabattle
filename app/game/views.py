from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect

# Create your views here.

def game(request):
    height1 = 11
    lenght1 = 11
    start_state = []
    for a in range(1, height1):
        c = []
        for b in range(1, lenght1):
            c.append({'display_value': ' ', 'index': str((a - 1) * (lenght1 - 1) + (b - 1))})
        start_state.append(c)
    state = start_state
    print(state)
    c={}
    return render(request=request, template_name="game/gamefield.html", context={"field": state})