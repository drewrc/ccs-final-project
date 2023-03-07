from django.db import models
from django.conf import settings

# Create your models here.
class Conversations(models.Model):
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="members", unique=False)

class Messages(models.Model):
    text = models.TextField(max_length=500, default='', blank=False)
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="sender", unique=False)
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="receiver", unique=False)
    conversation = models.ForeignKey(Conversations, related_name="conversations", on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True),
    is_read = models.BooleanField(default=False, blank=False)