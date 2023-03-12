from django.shortcuts import render
from .models import Story, Timeline
from .serializers import StorySerializer, TimelineSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
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


@receiver(post_save, sender=get_user_model())
def create_user_timeline(sender, instance, created, **kwargs):
    if created:
        Timeline.objects.create(user_timeline=instance)