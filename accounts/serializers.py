from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import User, Profile, FriendRequest, Activity
from dj_rest_auth.models import TokenModel
from django.core.exceptions import ValidationError


class TokenSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = TokenModel
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class FriendRequestSerializer(serializers.ModelSerializer):
    from_user = serializers.ReadOnlyField(source='from_user.username')
    to_user = serializers.ReadOnlyField(source='to_user.username')

    def self_request_test(self):
        print('hi')

    class Meta:
        model = FriendRequest
        fields = ('id', 'created_at', 'from_user', 'from_user_id',
                  'to_user', 'to_user_id', 'last_sent_at',)


class UserProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    username = serializers.ReadOnlyField(source='user.username')
    buddies = serializers.SerializerMethodField()
    buddies_count = serializers.SerializerMethodField()
    buddies_ids = serializers.SerializerMethodField()

    def get_buddies(self, obj):
        return obj.user.buddies.values_list('username', flat=True)

    class Meta:
        model = Profile
        fields = ['id', 'user', 'username', 'pronouns', 'gender', 'profile_pic', 'profile_banner', 'biography',
                  'first_name', 'last_name', 'buddies', 'coordinates', 'gym_location', 'buddies_count', 'buddies_ids']

    def get_buddies_ids(self, obj):
        return obj.user.buddies.values_list('id', flat=True)

    def get_buddies_count(self, obj):
        return obj.user.buddies.count()

    def get_coordinates(self, obj):
        return obj.get_gym_location_coordinates()

    def update(self, instance, validated_data):
        try:
            user_data = validated_data.pop('user', {})
            user = instance.user

            instance.profile_pic = validated_data.get(
                'profile_pic', instance.profile_pic)
            instance.profile_banner = validated_data.get(
                'profile_banner', instance.profile_banner)
            instance.biography = validated_data.get(
                'biography', instance.biography)
            instance.gender = validated_data.get('gender', instance.gender)
            instance.pronouns = validated_data.get(
                'pronouns', instance.pronouns)
            instance.gym_location = validated_data.get(
                'gym_location', instance.gym_location)
            instance.coordinates = validated_data.get(
                'coordinates', instance.coordinates)
            # instance.first_name = validated_data.get('first_name', instance.first_name)
            # instance.last_name = validated_data.get('last_name', instance.last_name)

            for attr, value in validated_data.items():
                setattr(instance, attr, value)

            for attr, value in user_data.items():
                setattr(user, attr, value)

            instance.save()
            user.save()

        except ValidationError as e:
            print(e.detail)

        return instance


class BuddySerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('profile',)


class UserBuddySerializer(serializers.ModelSerializer):
    buddies = BuddySerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('buddies',)

class NonBuddyProfileSerializer(UserProfileSerializer):
    def to_representation(self, instance):
        #prevent return of user profile 
        if instance == self.context['request'].user.profile:
            return None
        return super().to_representation(instance)

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('name',)

    def validate_name(self, value):
        """
        validate that the activity name is not blank
        """
        if not value.strip():
            raise serializers.ValidationError("Activity name cannot be blank.")
        return value

    def create(self, validated_data):
        """
        create a new activity instance with the validated data
        """
        activity = Activity.objects.create(name=validated_data['name'])
        return activity