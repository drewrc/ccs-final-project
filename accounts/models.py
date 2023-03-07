from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models

#IMPORT CUSTOM USER MODEL FROM:
#https://docs.djangoproject.com/en/4.1/topics/auth/customizing/
from django.contrib.auth.models import AbstractUser

#CUSTOM USER MODEL CLASS
class User(AbstractUser):
    buddies = models.ManyToManyField("User", blank=True)
    def __str__(self):
        return self.username
    
class Friend_Request(models.Model):
    from_user = models.ForeignKey(
        User, related_name='from_user', on_delete=models.CASCADE)
    to_user = models.ForeignKey(
        User, related_name='to_user', on_delete=models.CASCADE)

