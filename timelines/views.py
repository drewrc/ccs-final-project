from django.shortcuts import render
from .models import Story, Timeline
from .serializers import StorySerializer, TimelineSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from rest_framework.response import Response

# Create your views here.


class UserTimelineListCreateView (generics.ListCreateAPIView):
    serializer_class = TimelineSerializer
    queryset = Timeline.objects.all()
    permission_classes = [IsAuthenticated]


class UserStoryListCreateView (generics.ListCreateAPIView):
    serializer_class = StorySerializer
    permission_classes = [IsAuthenticated]
    queryset = Story.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


@receiver(post_save, sender=get_user_model())
def create_user_timeline(sender, instance, created, **kwargs):
    if created:
        Timeline.objects.create(user=instance)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_timeline(request):
    user = request.user
    try:
        timeline = Timeline.objects.get(user=user)
        serializer = TimelineSerializer(timeline)
        return Response(serializer.data)
    except Timeline.DoesNotExist:
        return Response({"message": "Timeline does not exist."}, status=404)
