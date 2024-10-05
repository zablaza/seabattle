from django.shortcuts import render, redirect
from core import models
from . import forms
from django.urls import reverse
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, authenticate, logout
from django.http import HttpResponseRedirect, HttpResponse

# Create your views here.
def user_signup(request):
    context = {}
    if request.method == "POST":
        form = forms.RegistrationForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get("username")
            password1 = form.cleaned_data.get("password1")
            password2 = form.cleaned_data.get("password2")
            email = form.cleaned_data.get("email")
            form.save()
            return redirect(reverse('account_app:login'))
        else:
            context["registration_form"] = form
    elif request.method == "GET":
        form = forms.RegistrationForm()
        context["registration_form"] = form
    return render(request=request, template_name='accounts/signup.html', context=context)

def user_login(request):
    context = {}
    if request.method == "POST":
        login_form = AuthenticationForm(request=request, data=request.POST)
        if login_form.is_valid():
            username = login_form.cleaned_data.get("username")
            password = login_form.cleaned_data.get("password")
            user_obj = authenticate(request=request, username=username, password=password)
            if user_obj:
                login(request, user_obj)
        else:
            context["authentication_form"] = login_form

    if request.method == "GET":
        form = AuthenticationForm()
        context["authentication_form"] = form
    return render(request=request, template_name='accounts/login.html', context=context)

def user_logout(request):
    if not request.user.is_authenticated:
        return redirect(reverse('account_app:login'))
    if request.method == "POST":
        islog = request.POST['logout']
        logout(request)
        return redirect(reverse('account_app:login'))
    return render(request=request, template_name='accounts/logout.html')
