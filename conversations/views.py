# from django.shortcuts import render
from rest_framework import generics
from .models import Message, Conversation
from .serializers import MessageSerializer, ConversationSerializer
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

# from rest_framework.decorators import api_view, permission_classes
# from rest_framework import permissions, status

class UserMessageListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer
    def get_queryset(self):
        return Message.objects.filter(
            Q(sender=self.request.user) | Q(receiver=self.request.user))
    
class UserMessageRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer
    def get_queryset(self):
        user = self.request.user
        return Message.objects.all()
    
class ConversationListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ConversationSerializer
    def get_queryset(self):
        return Conversation.objects.filter(members=self.request.user)
    
class UserMessageList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer

    def get_queryset(self):
        conversation_id = self.kwargs.get('pk')
        return Message.objects.filter(
            Q(sender=self.request.user, conversation__id=conversation_id) |
            Q(receiver=self.request.user, conversation__id=conversation_id)
        )
    
class MarkMessageAsRead(generics.UpdateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        message_id = self.kwargs.get('pk')
        message = get_object_or_404(Message, id=message_id)
        if self.request.user not in [message.sender, message.receiver]:
            raise PermissionDenied("Forbidden")
        return message

    def patch(self, request, *args, **kwargs):
        message = self.get_object()
        message.is_read = True
        message.save()
        serializer = self.get_serializer(message)
        return Response(serializer.data)
    

    
# @api_view(['PUT'])
# @permission_classes((permissions.AllowAny,))
# def send_match_request(request, userID):
#     if request.method == 'POST':
#         from_user = request.user
#         to_user = User.objects.get(id=userID)
#         friend_request, created = FriendRequest.objects.get_or_create(
#             from_user=from_user, to_user=to_user)
#         if created:
#             return Response('friend request sent')
#         else:
#             return Response('friend request already sent')