# Generated by Django 4.1.7 on 2023-03-11 22:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('conversations', '0005_remove_message_conversation'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='conversation',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='conversations', to='conversations.conversation'),
        ),
    ]
