from rest_framework import serializers
from .models import Story, Timeline
from django.contrib.auth import get_user_model

User = get_user_model()


class StorySerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Story
        fields = '__all__'
        read_only_fields = ('author',)  # make author read-only by default


class TimelineSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Timeline
        fields = '__all__'
