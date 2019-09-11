from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.http import JsonResponse
from django.utils import timezone

from .models import Message

# Create your views here.


def index(request):
    user = request.user
    if (user.is_authenticated):
        if(request.method == "POST" and request.is_ajax()):
            msg = request.POST['message']
            rc = User.objects.get(email="guido@python.org")
            Message.objects.create(msender=user, mreceiver=rc, mbody=str(
                msg), mdate=timezone.now())
            return JsonResponse({"success": True}, status=200)
        msg = Message.objects.all()
        args = {'msg': msg}
        return render(request, 'chatting/index.html', args)
    else:
        messages.info(request, "Please authenticate first")
        return redirect('accounts/login')
