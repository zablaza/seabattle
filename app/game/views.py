from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect

# Create your views here.

def game(request):
    return HttpResponse("Hello, this is sea battle")