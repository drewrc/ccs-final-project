from django.contrib import admin
from .models import Message, Conversation
admin.site.register(Conversation)

# Register your models here.
admin.site.register(Message)
