from django.db import models
# from django.contrib.gis.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
import os
from geopy.geocoders import GoogleV3
from geopy.exc import GeocoderTimedOut

# IMPORT CUSTOM USER MODEL FROM:
# https://docs.djangoproject.com/en/4.1/topics/auth/customizing/
# from django.contrib.auth.models import AbstractUser

# CUSTOM USER MODEL CLASS

class User(AbstractUser):
    buddies = models.ManyToManyField("User", blank=True)
    phone = PhoneNumberField(blank=True)
    user_profile = models.OneToOneField(
        'Profile', related_name="profile_user", on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.username

class FriendRequest(models.Model):
    from_user = models.ForeignKey(
        User, related_name='from_user', on_delete=models.CASCADE)
    to_user = models.ForeignKey(
        User, related_name='to_user', on_delete=models.CASCADE)

class Profile(models.Model):
    MALE = 'Male'
    FEMALE = 'Female'
    NONBINARY = 'Non-binary'
    TRANS = 'Trans'
    OTHER = 'Other'

    GENDER_CHOICES = [
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (NONBINARY, 'Non-binary'),
        (TRANS, 'Trans'),
        (OTHER, 'Other'),
    ]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name="profile", on_delete=models.CASCADE)
    pronouns = models.CharField(max_length=255, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True)
    profile_pic = models.ImageField(upload_to='images/', blank=True)
    profile_banner = models.ImageField(upload_to='images/', blank=True)
    gym_location = models.CharField(max_length=255, blank=True)
    coordinates = models.CharField(max_length=255, blank=True)
    biography = models.CharField(max_length=255, blank=True)
    def __str__(self):
        return self.user.username
    def get_gym_location_coordinates(self):
        if not self.gym_location:
            return None
        #api key ->>>>>>
        DJANGO_MAPS = 'DJANGO_GOOGLE_MAPS_API_KEY'
        # Initialize the Geopy GoogleV3 geocoder
        geolocator = GoogleV3(DJANGO_MAPS=DJANGO_MAPS)
        # Geopy geolocator to get the coordinates for the gym location
        try:
            location = geolocator.geocode(self.gym_location)
            if location is not None:
                coordinates = f"{location.latitude}, {location.longitude}"
                self.coordinates = coordinates
                self.save()
                return coordinates
        except GeocoderTimedOut:
            return None

        return None
