from django.db import models

#IMPORT CUSTOM USER MODEL FROM:
#https://docs.djangoproject.com/en/4.1/topics/auth/customizing/
from django.contrib.auth.models import AbstractUser

#CUSTOM USER MODEL CLASS
class User(AbstractUser):
    pass

