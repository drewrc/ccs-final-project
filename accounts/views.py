from django.shortcuts import render
from .serializers import UserSerializer, BuddySerializer, UserProfileSerializer
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.db import IntegrityError, models
from django.shortcuts import get_object_or_404
from rest_framework import generics
from .models import User, FriendRequest, Profile
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions, status
from .send_sms import client
from rest_framework.exceptions import NotFound
from .permissions import IsAuthorOrReadOnly


class UserListAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRetrieveDetailAPIView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        user_id = self.kwargs['user_id']
        return get_object_or_404(self.queryset, user=user_id)



class CurrentUserListAPIView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile


class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthorOrReadOnly]


class UserProfileRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]


class UserProfileListAPIView(generics.ListCreateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Profile.objects.all()
        queryset = queryset.select_related('user')
        return queryset

    # def get_queryset(self):
    #     queryset = Profile.objects.all()
    #     queryset = Profile.objects.prefetch_related('user')  ???
    #     return queryset


@receiver(post_save, sender=get_user_model())
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

# @api_view(['GET'])
# @permission_classes((permissions.IsAuthenticated,))
# def current_user(request, pk):
#     try:
#         instance = Profile.objects.all()
#     except Profile.DoesNotExist:
#         return Response (status=status.HTTP_404_NOT_FOUND)
#     instance

    #     current_user = User.objects.get(id=userID)
    # return Response(userID, status=status.HTTP_200_OK)

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

# refactored w twilio


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
    try:
        if request.method == 'POST':
            friend_request = FriendRequest.objects.get(id=requestID)
            if friend_request.to_user == request.user:
                friend_request.to_user.buddies.add(friend_request.from_user)
                friend_request.from_user.buddies.add(friend_request.to_user)
                friend_request.delete()
                return Response('request accepted')
            else:
                return Response('request not accepted')
    except IntegrityError:
        return Response({'error': 'You have already sent a friend request to this user.'})
    except User.DoesNotExist:
        return Response({'error': 'Recipient not found.'})


@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def friend_requests(request):
    friend_requests = FriendRequest.objects.filter(to_user=request.user)
    serializer = BuddySerializer(friend_requests, many=True)
    return Response(serializer.data)


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


class BuddyList(generics.ListCreateAPIView):
    queryset = FriendRequest.objects.all()
    serializer_class = BuddySerializer

    def get_queryset(self):
        user = self.request.user
        return FriendRequest.objects.filter(
            models.Q(from_user_id=user.id) | models.Q(to_user_id=user.id)
        )

    def perform_create(self, serializer):
        serializer.save(from_user=self.request.user)


class BuddyDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BuddySerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return FriendRequest.objects.filter(
            models.Q(from_user_id=user.id) | models.Q(to_user_id=user.id)
        )


@ api_view(['GET'])
@ permission_classes((permissions.IsAuthenticated,))
def UserProfileView(request, pk):
    user_profile = get_object_or_404(User, pk=pk)
    serializer = UserProfileSerializer(user_profile)
    return Response(serializer.data, status=status.HTTP_200_OK)

# for sending messages


@ api_view(['POST'])
@ permission_classes((permissions.IsAuthenticated,))
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
