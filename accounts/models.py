from django.db import models
# from django.contrib.gis.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
import os
from geopy.geocoders import GoogleV3
from geopy.exc import GeocoderTimedOut

#api key ->>>>>>
DJANGO_MAPS = os.environ['DJANGO_GOOGLE_MAPS_API_KEY']

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
    TRANS = 'Trans-Gender'
    OTHER = 'Other'

    GENDER_CHOICES = [
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (NONBINARY, 'Non-binary'),
        (TRANS, 'Trans-Gender'),
        (OTHER, 'Other'),
    ]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name="profile", on_delete=models.CASCADE)
    pronouns = models.CharField(max_length=255, blank=True)
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, blank=True)
    profile_pic = models.ImageField(upload_to='images/', blank=True, default='media/images/profilepicdefault.png')
    profile_banner = models.ImageField(upload_to='images/', blank=True, default='/media/images/defaultbanner_Ar155VZ.png')
    gym_location = models.CharField(max_length=255, blank=True)
    coordinates = models.CharField(max_length=255, blank=True)
    biography = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.user.username
    
    def get_gym_location_coordinates(self):
        if not self.gym_location:
            return None
        # Initialize the Geopy GoogleV3 geocoder
        geolocator = GoogleV3(DJANGO_MAPS)
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
    def save(self, *args, **kwargs):
        if self.gym_location and not self.coordinates:
            # Retrieve coordinates for gym_location and set the coordinates field
            coordinates = self.get_gym_location_coordinates()
            if coordinates:
                self.coordinates = f"{coordinates[0]}, {coordinates[1]}"
        super(Profile, self).save(*args, **kwargs)
