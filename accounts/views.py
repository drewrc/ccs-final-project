from django.shortcuts import render
from .serializers import UserSerializer, BuddySerializer, UserProfileSerializer
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics
from .models import User, FriendRequest, Profile
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions, status
from .send_sms import client

class UserListAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class UserProfileListAPIView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

# @api_view(['POST'])
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

#refactored w twilio 
@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def send_match_request(request, userID):
    if request.method == 'POST':
        from_user = request.user
        to_user = User.objects.get(id=userID)
        friend_request, created = FriendRequest.objects.get_or_create(
            from_user=from_user, to_user=to_user)
        if created:
            # send notification to the to_user
            message = f"You have a new friend request from {from_user.username}."
            to_phone_number = to_user.phone.as_e164
            from_phone_number = "+18888419554"
            client.messages.create(
                to=to_phone_number,
                from_=from_phone_number,
                body=message
            )
            return Response('friend request sent')
        else:
            return Response('friend request already sent')

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def accept_match_request(request, requestID):
    if request.method == 'POST':
        friend_request = FriendRequest.objects.get(id=requestID)
        if friend_request.to_user == request.user:
            friend_request.to_user.buddies.add(friend_request.from_user)
            friend_request.from_user.buddies.add(friend_request.to_user)
            friend_request.delete()
            return Response('request accepted')
        else:
            return Response('request not accepted')

@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def match_request_count(request):
    if request.method == 'GET':
        count = FriendRequest.objects.filter(to_user=request.user).count()
    return Response(count, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def buddies_list(request):
    if request.method == 'GET':
        # import pdb
        # pdb.set_trace()
        # buddies = User.objects.filter(buddies=request.user)
        buddies = request.user.buddies.all()
    serializer = BuddySerializer(buddies, many=True)
    return Response(serializer.data)

class UserBuddyAPIView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(User, id=user_id)
        return user.buddies.all()
    
# class UserProfileView (generics.ListAPIView):
#     permission_classes = [IsAuthenticated]
#     serializer_class = UserSerializer
#     def get_queryset(self):
#         return super().get_queryset()

@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def UserProfileView(request, pk):
    user_profile = get_object_or_404(User, pk=pk)
    serializer = UserProfileSerializer(user_profile)
    return Response(serializer.data, status=status.HTTP_200_OK)

#for sending messages 
@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def send_message(request, user_id):
    message = request.data.get('message')
    to_user = get_object_or_404(User, id=user_id)
    to_phone_number = to_user.phone.as_e164
    from_phone_number = "+18888419554" 
    client.messages.create(
        to=to_phone_number,
        from_=from_phone_number,
        body=message
    )
    return Response({'status': 'Message sent'})


