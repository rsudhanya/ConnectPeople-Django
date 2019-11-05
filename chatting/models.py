from django.db import models
from django.conf import settings
from django.utils import timezone

# Create your models here.


class Message(models.Model):
    msender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='+',
    )
    mreceiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='+',
    )
    mbody = models.TextField()
    mdate = models.DateTimeField()

    def toDic(self):
        return {'msender': self.msender, 'mreceiver': self.mreceiver, 'mbody': self.mbody, 'mdate': self.mdate}

class UserConsumerSession(models.Model):
    on_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='+',
    )
    last_seen = models.DateTimeField()
    online = models.BooleanField()
