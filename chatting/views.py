from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.http import JsonResponse
from django.utils import timezone
from django.utils.safestring import mark_safe
import json
from django.core import serializers

from .models import Message

# Create your views here.


def index(request, frndname=""):
    user = request.user
    if (user.is_authenticated):
        friends = serializers.serialize("json", User.objects.filter(is_superuser=False))
        try:
            msglist = []
            rc = User.objects.get(username=frndname)
            msglist = serializers.serialize("json", (Message.objects.filter(msender=user, mreceiver=rc) | Message.objects.filter(msender=rc, mreceiver=user)).order_by('mdate'))
            print(msglist)
            room_name = "chatRoom"
        except:
            room_name = ""
            msglist = "[{}]"
            rc = ""
        return render(request, 'chatting/index.html', {'room_name_json': mark_safe(json.dumps(room_name)), 'friends': mark_safe(json.dumps(friends)), 'msglist': mark_safe(json.dumps(msglist)), 'rc': rc})
    else:
        messages.info(request, "Please authenticate first")
        return redirect('accounts/login')
