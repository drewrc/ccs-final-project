from django.shortcuts import render
from .models import Story, Timeline
from .serializers import StorySerializer, TimelineSerializer
from rest_framework import generics
# Create your views here.

class UserTimelineListCreateView (generics.ListCreateAPIView):
    serializer_class = TimelineSerializer
    queryset = Timeline.objects.all()

class UserStoryListCreateView (generics.ListCreateAPIView):
    serializer_class = StorySerializer
    def get_queryset(self):
        return Story.objects.filter(author__id=self.request.user.id)
    # def get_queryset(self):   
    #     return Story.objects.filter(author = self.request.user)