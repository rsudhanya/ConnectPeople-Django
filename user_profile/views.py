from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404  
from django.contrib import messages
from django.contrib.auth.models import User

from accounts.models import UserProfileDetails

# Create your views here.
def index(request, frndname):
    if(request.user.is_authenticated):
        try:
            userprofiledetails = UserProfileDetails.objects.filter(userprofileid=User.objects.get(username=frndname))
            userprofile = User.objects.filter(username=frndname)
            return render(request, 'user_profile/index.html', {'userprofiledetails': userprofiledetails, 'userprofile': userprofile})
        except:
            print("user_profile Error")
            raise Http404  
    else:
        messages.info(request, "Please authenticate first")
        return redirect("/")