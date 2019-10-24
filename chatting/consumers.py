from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.contrib.auth.models import User, auth
from django.utils import timezone

from .models import Message
from .models import UserConsumerSession


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
        if(UserConsumerSession.objects.filter(on_user=User.objects.get(username=str(self.scope["user"].username))).update(online=True) == 0):
            UserConsumerSession.objects.create(on_user=User.objects.get(username=str(
                self.scope["user"].username)), last_seen=timezone.localtime(timezone.now()), online=True)
        for i in UserConsumerSession.objects.all():
            if(i.online):
                await self.receive({'type': 'chat_message', 'ctype': 'Ncon', 'Ncon': str(i.on_user)})
            else:
                await self.receive({'type': 'chat_message', 'ctype': 'Dcon', 'Dcon': str(i.on_user), 'last_seen': str(i.last_seen)})

    async def disconnect(self, close_code):
        last_seen = timezone.localtime(timezone.now())
        UserConsumerSession.objects.filter(on_user=User.objects.get(username=str(
            self.scope["user"].username))).update(online=False, last_seen=last_seen)
        await self.receive({'type': 'chat_message', 'ctype': 'Dcon', 'Dcon': str(self.scope["user"].username), 'last_seen': str(last_seen)})
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        try:
            text_data_json = json.loads(text_data)
            message = text_data_json['message']
            msender = text_data_json['msender']
            mrc = text_data_json['mrc']
            tz = str(timezone.localtime(timezone.now()))
            ctype = text_data_json['ctype']
            Message.objects.create(msender=User.objects.get(username=msender), mreceiver=User.objects.get(username=mrc), mbody=message, mdate=tz)

            # Send message to room group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'ctype': ctype,
                    'message': message,
                    'msender': msender,
                    'mrc': mrc,
                    'tz': tz
                }
            )
        except:
            await self.channel_layer.group_send(
                self.room_group_name,
                text_data
            )

    # Receive message from room group
    async def chat_message(self, event):
        try:
            # # Send message to WebSocket
            await self.send(text_data=json.dumps({
                'type': event['type'],
                'message': event['message'],
                'msender': event['msender'],
                'mrc': event['mrc'],
                'tz': str(timezone.localtime(timezone.now())),
                'ctype': event['ctype']
            }))
        except:
            try:
                await self.send(text_data=json.dumps({
                    'type': event['type'],
                    'ctype': event['ctype'],
                    'Ncon': event['Ncon']
                }))
            except:
                await self.send(text_data=json.dumps({
                    'type': event['type'],
                    'ctype': event['ctype'],
                    'Dcon': event['Dcon'],
                    'last_seen': event['last_seen']
                }))
