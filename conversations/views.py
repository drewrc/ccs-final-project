# from django.shortcuts import render
from rest_framework import generics
from .models import Message, Conversation
from .serializers import MessageSerializer, ConversationSerializer


class UserMessageListCreate(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    def get_queryset(self):
        return Message.objects.filter(sender=self.request.user)
    def perform_create(self, serializer):
        return serializer.save(sender=self.request.user)
    
class ConversationListCreate(generics.ListCreateAPIView):
    serializer_class = ConversationSerializer
    def get_queryset(self):
        return Conversation.objects.filter(members=self.request.user)