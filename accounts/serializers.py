from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import User
from dj_rest_auth.models import TokenModel

# class ProfileSerializer(serializers.ModelSerializer):
#     user_name = serializers.ReadOnlyField(source = 'user.username')
#     email = serializers.ReadOnlyField(source='profile.email')
#     class Meta:
#         model = Profile
#         fields = ('__all__')

class TokenSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = TokenModel
        fields = ('__all__')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')