from django.shortcuts import render
from .models import Story, Timeline
from .serializers import StorySerializer, TimelineSerializer
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from rest_framework.response import Response

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

class UserUpdateRetrieveDeleteView (generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StorySerializer
    permission_classes = [IsAuthenticated]
    queryset = Story.objects.all()

#creates a new timeline for each user on registration
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
    
# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def user_edit_story(request, pk):
#     try:
#         instance = Story.objects.get(pk=pk)
#     except Story.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#     instance.img = ''
#     instance.save()
#     serializer = StorySerializer(instance)
#     return Response(serializer.data)




# @api_view(['GET', 'PUT'])
# @permission_classes([IsAuthenticated])
# def user_edit_story(request, pk):
#     try:
#         instance = Story.objects.get(pk=pk)
#         if instance.author != request.author:
#             return Response(status=status.HTTP_403_FORBIDDEN)
#     except Story.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#      # Retrieve data from request and validate it
#     serializer = StorySerializer(instance, data=request.data, partial=True)
#     if not serializer.is_valid():
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     # Update instance with new data and save it
#     serializer.save()
#     serializer = StorySerializer(instance)
#     return Response(serializer.data)
