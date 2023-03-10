from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import User
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
        fields = ('username', 'id','buddies')
   