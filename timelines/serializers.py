from rest_framework import serializers
from .models import Story, Timeline

class StorySerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta: 
        model = Story
        fields = ('__all__')

class TimelineSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='author.username')
    class Meta: 
        model = Timeline
        fields = ('__all__')