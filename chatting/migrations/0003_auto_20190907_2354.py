# Generated by Django 2.2.4 on 2019-09-07 23:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chatting', '0002_message_mdate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='mdate',
            field=models.DateTimeField(),
        ),
    ]