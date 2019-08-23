from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User, auth
from django.contrib import messages

# Create your views here.


def index(request):
    user = request.user
    if (user.is_authenticated):
        # return HttpResponse("Hello from Chatting!!!" + user.first_name)
        return render(request, 'chatting/index.html')
    else:
        messages.info(request, "Please authenticate first")
        return redirect('accounts/login')
