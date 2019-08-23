from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages

# Create your views here.


def logout(request):
    auth.logout(request)
    messages.info(request, "You have successfully logged out!!!")
    return redirect('login')


def login(request):
    if(request.user.is_authenticated):
        return redirect('/')
    if(request.method == 'POST'):
        username = request.POST['email']
        password = request.POST['password']
        user = auth.authenticate(username=username, password=password)
        if(user is not None):
            auth.login(request, user)
            return redirect('/')
        else:
            messages.info(request, "Invalid credentials!!!")
            return redirect('login')
    return render(request, 'accounts/login.html')


def register(request):
    if(request.user.is_authenticated):
        return redirect('/')
    if(request.method == 'POST'):
        first_name = request.POST['fname']
        last_name = request.POST['lname']
        email = request.POST['email']
        rpassword = request.POST['password']
        confirmpassword = request.POST['confirmPassword']
        if (rpassword == confirmpassword):
            if (User.objects.filter(username=email).exists()):
                messages.info(request, "Username taken!!!")
                return redirect('register')
            else:
                user = User.objects.create_user(
                    username=email, password=rpassword, email=email, first_name=first_name, last_name=last_name)
                user.save()
                return redirect('https://www.google.co.in/')
        else:
            messages.info(request, "Password not Matching!!!")
            return redirect('register')
    return render(request, 'accounts/register.html')
