from django.shortcuts import render
from .serializers import UserSerializer, BuddySerializer
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics
from .models import User, FriendRequest
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions, status


class UserListAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# class BuddiesListAPIView(generics.ListAPIView):
#     queryset = User.objects.filter()
#     serializer_class = UserSerializer


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def send_match_request(request, userID):
    if request.method == 'POST':
        from_user = request.user
        to_user = User.objects.get(id=userID)
        friend_request, created = FriendRequest.objects.get_or_create(
            from_user=from_user, to_user=to_user)
        if created:
            return HttpResponse('friend request sent')
        else:
            return HttpResponse('friend request already sent')


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
@permission_classes((permissions.AllowAny,))
def buddies_list(request):
    if request.method == 'GET':
        # import pdb
        # pdb.set_trace()
        buddies = User.objects.filter(buddies=request.user)
    serializer = BuddySerializer(buddies, many=True)
    return Response(serializer.data)
