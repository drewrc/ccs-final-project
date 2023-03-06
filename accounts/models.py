from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models

#IMPORT CUSTOM USER MODEL FROM:
#https://docs.djangoproject.com/en/4.1/topics/auth/customizing/
from django.contrib.auth.models import AbstractUser

#CUSTOM USER MODEL CLASS
class User(AbstractUser):
    pass

class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    user_name = models.CharField(max_length=255)

    def __str__(self):
        return self.user.username