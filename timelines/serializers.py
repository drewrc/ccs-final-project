from rest_framework import serializers
from .models import Story, Timeline

class StorySerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta: 
        model = Story
        fields = '__all__'
        read_only_fields = ('author',) # make author read-only by default

    def create(self, validated_data):
        request = self.context.get('request')
        author = request.user
        story = Story.objects.create(author=author, **validated_data)
        return story

class TimelineSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='author.username')
    class Meta: 
        model = Timeline
        fields = ('__all__')