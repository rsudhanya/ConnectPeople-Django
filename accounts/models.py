from django.db import models
from django.conf import settings

# Create your models here.

class UserProfileDetails(models.Model):
    userprofileid = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='+', primary_key=True,
    )
    dob = models.TextField()
    sex = models.TextField()
    nationality = models.TextField()
    lives_in = models.TextField()
    work = models.TextField()
    education = models.TextField()
    something  = models.TextField()
    image_file = models.FileField(upload_to='', default='/media/user_default_avatar.jpg')

