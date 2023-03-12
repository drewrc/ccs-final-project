from django.shortcuts import render
from .models import Story, Timeline
from .serializers import StorySerializer, TimelineSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class UserTimelineListCreateView (generics.ListCreateAPIView):
    serializer_class = TimelineSerializer
    queryset = Timeline.objects.all()
    permission_classes = [IsAuthenticated]
 

class UserStoryListCreateView (generics.ListCreateAPIView):
    serializer_class = StorySerializer
    permission_classes = [IsAuthenticated]
    queryset = Story.objects.all()
    # def get_queryset(self):
    #     return Story.objects.filter(author__id=self.request.user.id)
    # def get_queryset(self):   
    #     return Story.objects.filter(author = self.request.user)