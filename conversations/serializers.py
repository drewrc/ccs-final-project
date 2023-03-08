from rest_framework import serializers
from .models import Conversation, Message

class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model= Conversation
        fields= ('__all__')

class MessageSerializer(serializers.ModelSerializer):
    user_from = serializers.ReadOnlyField(source='sender.username')
    user_to = serializers.ReadOnlyField(source='receiver.username')
    class Meta:
        model= Message
        fields= ['id', 'user_from', 'user_to', 'text', 'sender', 'receiver', 'date_created', 'conversation',]