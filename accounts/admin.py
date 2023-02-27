from django.contrib import admin

#Import User Admin and User from models.py 
#https://docs.djangoproject.com/en/4.1/topics/auth/customizing/#substituting-a-custom-user-model
from django.contrib.auth.admin import UserAdmin 
from .models import User

# UserAdmin and User as custom user
admin.site.register(User, UserAdmin)