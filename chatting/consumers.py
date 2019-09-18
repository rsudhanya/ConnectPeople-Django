from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.contrib.auth.models import User, auth
from django.utils import timezone

from .models import Message


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        msender = text_data_json['msender']
        mrc = text_data_json['mrc']
        tz = str(timezone.localtime(timezone.now()))
        Message.objects.create(msender=User.objects.get(username=msender), mreceiver=User.objects.get(username=mrc), mbody=message, mdate=tz)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'msender': msender,
                'mrc': mrc,
                'tz': tz
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        msender = event['msender']
        mrc =  event['mrc']
        tz = str(timezone.localtime(timezone.now()))

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'msender': msender,
            'mrc': mrc,
            'tz': tz
        }))
