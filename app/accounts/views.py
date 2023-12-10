from django.shortcuts import render, redirect
from core import models
from . import forms
from django.urls import reverse
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, authenticate, logout
from django.http import HttpResponseRedirect, HttpResponse

# Create your views here.
def user_signup(request):
    print(request)
    context = {}
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password1')
        email = request.POST.get('email')
        print("-->", username)
        models.User.objects.create_user(username = username, password = password, email = email)
        return redirect(reverse('account_app:login'))
    elif request.method == "GET":
        form = forms.RegistrationForm()
        context["registration_form"] = form
    return render(request=request, template_name='accounts/signup.html', context=context)

def user_login(request):
    context = {}
    if request.method == "POST":
        login_form = AuthenticationForm(request=request, data=request.POST)
        if login_form.is_valid():
            print("-------> ok <-------")
            username = login_form.cleaned_data.get("username")
            password = login_form.cleaned_data.get("password")
            user_obj = authenticate(request=request, username=username, password=password)
            if user_obj:
                print(user_obj)
                login(request, user_obj)
                return redirect(reverse('playground:gamelist_state'))
        else:
            print("not ok")
            print(login_form.errors.as_data())
        print(login_form["username"])
        #print(request.POST)

    if request.method == "GET":
        logns = models.User.objects.all()
        form = AuthenticationForm()
        context["authentication_form"] = form
        #return redirect(reverse('table'))
    return render(request=request, template_name='login.html', context=context)

def user_logout(request):
    if not request.user.is_authenticated:
        return redirect(reverse('account_app:login'))
    print(request.method)
    if request.method == "POST":
        islog = request.POST['logout']
        print(islog, "islog")
        logout(request)
        print(next, type(next))
        return redirect(reverse('account_app:login'))
        print(request.user)
    return render(request=request, template_name='logout.html')
