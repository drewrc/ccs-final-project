from django.shortcuts import render, get_object_or_404
from .models import Story, Timeline
from .serializers import StorySerializer, TimelineSerializer
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from django.db.models import Q

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
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_story(request, pk):
    # Get the story instance
    story = get_object_or_404(Story, pk=pk)
    
    # Check if the user has already liked the story
    # if request.user in story.likes.all():
    #     return Response({'message': 'You have already liked this story.'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Increment the likes count
    story.likes += 1
    
    # Add the user to the likes list
    # story.likes.add(request.user)
    
    # Save the changes to the database
    story.save()
    
    # Return a success response
    return Response({'message': 'Story liked successfully.'}, status=status.HTTP_200_OK)


class GetUserStories(generics.ListAPIView):
    serializer_class = StorySerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Story.objects.filter(author=self.request.user)

class RecentStoriesFromFriendsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StorySerializer

    def get_queryset(self):
        # Determine which users are friends of the current user
        friends = self.request.user.buddies.all()

        # Query the Story model to retrieve all stories from the friends of the current user, 
        # ordered by the date_created field in descending order (most recent first)
        queryset = Story.objects.filter(
            Q(author__in=friends) | Q(timeline__user__in=friends)).order_by('-date_created')
        return queryset

    def get(self, request):
        # Get the queryset for the current user
        queryset = self.get_queryset()

        # Serialize the queryset
        serializer = self.serializer_class(queryset, many=True)

        # Return the serialized data
        return Response(serializer.data)
