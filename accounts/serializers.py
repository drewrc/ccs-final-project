from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import User, Profile
from dj_rest_auth.models import TokenModel


class TokenSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = TokenModel
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class BuddySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'id', 'buddies')

class UserProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    username = serializers.ReadOnlyField(source='user.username')
    buddies = serializers.SerializerMethodField()
    buddies_count = serializers.SerializerMethodField()
    # gym_location = serializers.CharField()

    def get_buddies(self, obj):
        return obj.user.buddies.values_list('username', flat=True)
    
    class Meta:
        model = Profile
        fields = ['user', 'username', 'pronouns', 'gender', 'profile_pic', 'profile_banner', 'biography', 'first_name', 'last_name', 'buddies', 'buddies_count',] 
                #   'gym_location'
                
        read_only_fields = ['user']

    def get_buddies_count(self, obj):
        return obj.user.buddies.count()