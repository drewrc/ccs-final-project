# from django.shortcuts import render
from rest_framework import generics
from .models import Message, Conversation
from .serializers import MessageSerializer, ConversationSerializer
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
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
        queryset = Message.objects.filter(
            Q(sender=self.request.user) | Q(receiver=self.request.user))

        queryset.filter(is_read=False, receiver=self.request.user).update(
            is_read=True)

        return queryset


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


class MarkMessageAsRead(APIView):
    def read_message(self, request, message_id):
        message = get_object_or_404(Message, id=message_id)
        if request.user == message.receiver:
            message.is_read = True
            message.save()
            return Response({'message': 'Message updated successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'You are not authorized to perform this action.'}, status=status.HTTP_403_FORBIDDEN)


class UnreadMessages(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        unread_messages_count = Message.objects.filter(
            receiver=request.user, is_read=False).count()
        return Response({'unread_messages_count': unread_messages_count}, status=status.HTTP_200_OK)

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
