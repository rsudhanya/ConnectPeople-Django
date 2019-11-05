from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.http import HttpResponse
from django.core.files.storage import FileSystemStorage

from .models import UserProfileDetails

# Create your views here.

def password_change_done(request):
    if(request.user.is_authenticated):
        messages.info(request, "Password changed!!!")
        return redirect('/accounts/my_account')
    else:
        return redirect('/')


def logout(request):
    auth.logout(request)
    messages.info(request, "You have successfully logged out!!!")
    return redirect('login')


def about(request):
    return render(request, 'accounts/about.html')


def my_account(request):
    user = request.user
    if(user.is_authenticated):
        if(request.method == 'POST'):
            first_name = last_name = dob = sex = nationality = lives_in = work = education = something  = current_password = image_file = None
            first_name = request.POST["first_name"]
            last_name = request.POST["last_name"]
            dob = request.POST["dob"]
            try:
                sex = request.POST["sex"]
            except:
                print("sex Error")
            nationality = request.POST["nationality"]
            lives_in = request.POST["lives_in"]
            work = request.POST["work"]
            education = request.POST["education"]
            something = request.POST["something"]
            current_password = request.POST["current_password"]
            try:
                image_file = request.FILES["image_file"]
            except:
                print("Image Error")
            if(user.check_password(current_password)):
                if(image_file != None):
                    fs = FileSystemStorage()
                    iname = fs.save(image_file.name, image_file)
                    iname_url = fs.url(iname)
                    UserProfileDetails.objects.filter(userprofileid=User.objects.get(username=str(user.username))).update(image_file=iname_url)
                    print(iname_url)
                if(dob != None or dob != ''):
                    UserProfileDetails.objects.filter(userprofileid=User.objects.get(username=str(user.username))).update(dob=dob)
                if(sex != None or sex != ''):
                    UserProfileDetails.objects.filter(userprofileid=User.objects.get(username=str(user.username))).update(sex=sex)
                if(nationality != None or nationality != ''):
                    UserProfileDetails.objects.filter(userprofileid=User.objects.get(username=str(user.username))).update(nationality=nationality)
                if(lives_in != None or lives_in != ''):
                    UserProfileDetails.objects.filter(userprofileid=User.objects.get(username=str(user.username))).update(lives_in=lives_in)
                if(work != None or work != ''):
                    UserProfileDetails.objects.filter(userprofileid=User.objects.get(username=str(user.username))).update(work=work)
                if(education != None or education != ''):
                    UserProfileDetails.objects.filter(userprofileid=User.objects.get(username=str(user.username))).update(education=education)
                if(something != None or something != ''):
                    UserProfileDetails.objects.filter(userprofileid=User.objects.get(username=str(user.username))).update(something=something)
                if(first_name == None or first_name == ''):
                    first_name = user.first_name
                if(last_name == None or last_name == ''):
                    last_name = user.last_name
                user.first_name = first_name
                user.last_name = last_name
                user.save()
                messages.info(request, "Account updated!!!")
            else:
                messages.info(request, "Invalid current Password")
            return redirect('/accounts/my_account')
        try:
            UserProfileDetails.objects.create(userprofileid=user)
        except:
            print("UserProfileDetails object already exists")
        userprofiledetails = UserProfileDetails.objects.filter(userprofileid=User.objects.get(username=str(user.username)))
        print(userprofiledetails)
        return render(request, 'accounts/my_account.html', {'userprofiledetails': userprofiledetails})
    else:
        messages.info(request, "Please authenticate first")
        return redirect("/")


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
                UserProfileDetails.objects.create(userprofileid=user)
                return redirect('/')
        else:
            messages.info(request, "Password not Matching!!!")
            return redirect('register')
    return render(request, 'accounts/register.html')
