from django.db import models
# from django.contrib.gis.db import models
from geopy import Point
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
import os
from geopy.geocoders import GoogleV3
from geopy.exc import GeocoderTimedOut
import datetime

#api key ->>>>>>
DJANGO_MAPS = os.environ['DJANGO_GOOGLE_MAPS_API_KEY']

#COOLDOWN VAR 
COOLDOWN_PERIOD = datetime.timedelta(days=1)

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
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    last_sent_at = models.DateTimeField(null=True, blank=True)
    #this sets model up to recieve only unique requests and throws Integrtiy error if not 
    class Meta:
        unique_together = ('from_user', 'to_user')
    
    def send_new_friend_request_after_reject(self):
        if not self.last_sent_at:
            return True
        return datetime.datetime.now() - self.last_sent_at > COOLDOWN_PERIOD
    def __str__(self):
        return f"{self.from_user.username} to {self.to_user.username}"

class Activity(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

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
    activities = models.ManyToManyField(Activity, blank=True)

    def __str__(self):
        return self.user.username
    
    def add_activities(self, activity_names):
        for activity_name in activity_names:
            activity, created = Activity.objects.get_or_create(name=activity_name)
            self.activities.add(activity)
    
    def get_gym_location_coordinates(self):
        if not self.gym_location:
            return None

        # Initialize the Geopy GoogleV3 geocoder
        geolocator = GoogleV3(DJANGO_MAPS)

        # Use Geopy to get the coordinates for the gym location
        try:
            location = geolocator.geocode(self.gym_location)
            if location is not None:
                # Create a Point object from the location latitude and longitude
                point = Point(location.latitude, location.longitude)
                self.coordinates = str(point)
                self.save()  # Save the updated Profile instance
                return str(point)
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
