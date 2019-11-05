from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.http import JsonResponse
from django.utils import timezone
from django.utils.safestring import mark_safe
import json
from django.core import serializers
from django.http import Http404  

from .models import Message
from accounts.models import UserProfileDetails

# Create your views here.


def index(request, frndname=""):
    user = request.user
    room_name = "chatRoom"
    if (user.is_authenticated):
        friends = serializers.serialize("json", User.objects.filter(is_superuser=False))
        friends_details = serializers.serialize("json", UserProfileDetails.objects.all())
        try:
            msglist = []
            rc = User.objects.get(username=frndname)
            msglist = serializers.serialize("json", (Message.objects.filter(msender=user, mreceiver=rc) | Message.objects.filter(msender=rc, mreceiver=user)).order_by('mdate'))
        except:
            msglist = "[{}]"
            rc = ""
            if(frndname != ""):
                raise Http404  
        return render(request, 'chatting/index.html', {'room_name_json': mark_safe(json.dumps(room_name)), 'friends': mark_safe(json.dumps(friends)), 'friends_details': mark_safe(json.dumps(friends_details)), 'msglist': mark_safe(json.dumps(msglist)), 'rc': rc})
    else:
        messages.info(request, "Please authenticate first")
        return redirect('accounts/login')
