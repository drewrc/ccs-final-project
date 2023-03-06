from django.shortcuts import render
from .serializers import UserSerializer
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics
from .models import Profile, User
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
# Create your views here.

class UserListAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all();
    serializer_class = UserSerializer