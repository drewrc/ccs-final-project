# Generated by Django 4.1.7 on 2023-03-07 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('conversations', '0002_rename_conversations_conversation_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='date_created',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]
