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
        friends = serializers.serialize("json", User.objects.all())
        try:
            msglist = []
            rc = User.objects.get(username=frndname)
            for i in Message.objects.all():
                t = i.toDic()
                if((t['msender'] == user and t['mreceiver'] == rc) or (t['mreceiver'] == user and t['msender'] == rc)):
                    msglist.append(i)
            msglist = serializers.serialize("json", msglist)
            room_name = "chatRoom"
        except:
            room_name = ""
            msglist = "[{}]"
            rc = ""
        return render(request, 'chatting/index.html', {'room_name_json': mark_safe(json.dumps(room_name)), 'friends': mark_safe(json.dumps(friends)), 'msglist': mark_safe(json.dumps(msglist)), 'rc': rc})
    else:
        messages.info(request, "Please authenticate first")
        return redirect('accounts/login')