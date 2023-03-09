# from django.shortcuts import render
from rest_framework import generics
from .models import Message, Conversation
from .serializers import MessageSerializer, ConversationSerializer
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

class UserMessageListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer
    def get_queryset(self):
        return Message.objects.filter(
            Q(sender=self.request.user) | Q(receiver=self.request.user)
        )
    
class ConversationListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ConversationSerializer
    def get_queryset(self):
        return Conversation.objects.filter(members=self.request.user)