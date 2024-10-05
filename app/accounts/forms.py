from django import forms
from core.models import User
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model

class RegistrationForm(UserCreationForm):
    """
      Form for Registering new users
    """
    email = forms.EmailField(max_length=60, help_text = 'Required. Add a valid email address')
    class Meta:
        User = get_user_model()
        model = User
        fields = ('username','email', 'password1', 'password2')