from django.contrib import admin

# Import User Admin and User from models.py
# https://docs.djangoproject.com/en/4.1/topics/auth/customizing/#substituting-a-custom-user-model
from django.contrib.auth.admin import UserAdmin
from .models import User, Profile, FriendRequest, Activity

# UserAdmin and User as custom user
admin.site.register(User, UserAdmin)
admin.site.register(Profile)
admin.site.register(FriendRequest)
admin.site.register(Activity)
