from django.shortcuts import render
from .serializers import UserSerializer
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics
from .models import User, Friend_Request
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
# Create your views here.

class UserListAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all();
    serializer_class = UserSerializer

@login_required 
def send_match_request(request, userID):
    from_user = request.user
    to_user = User.objects.get(id=userID)
    friend_request, created = Friend_Request.objects.get_or_create(
        from_user=from_user, to_user=to_user)
    if created:
        return HttpResponse('friend request sent')
    else:
        return HttpResponse('friend request already sent')

@login_required
def accept_match_request(request, requestID):
    friend_request = Friend_Request.object.get(id=requestID)
    if friend_request.to_user == request.user:
        friend_request.to_user.buddies.add(friend_request.from_user)
        friend_request.from_user.buddies.add(friend_request.to_user)
        friend_request.delete()
        return HttpResponse('friend request accepted')
    else:
        return HttpResponse('friend request not accepted')