# Generated by Django 2.2.4 on 2019-09-07 23:52

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('chatting', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='mdate',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]