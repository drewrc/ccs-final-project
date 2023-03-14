from django.db import models
# from django.contrib.gis.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField

# IMPORT CUSTOM USER MODEL FROM:
# https://docs.djangoproject.com/en/4.1/topics/auth/customizing/
# from django.contrib.auth.models import AbstractUser

# CUSTOM USER MODEL CLASS

class User(AbstractUser):
    buddies = models.ManyToManyField("User", blank=True)
    phone = PhoneNumberField(blank=True)
    # location = models.PointField(null=True, blank=True)
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
    # location = models.PointField( blank=True)
    # favorite_gym = models.PointField(blank=True)
    biography = models.CharField(max_length=255, blank=True)
    def __str__(self):
        return self.user.username
