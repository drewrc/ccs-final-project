from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('profiles/', views.UserListAPIView.as_view(), name="profile_add"),
]