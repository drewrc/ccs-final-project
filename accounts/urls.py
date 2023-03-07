from django.urls import path
from . import views
from .views import send_friend_request, accept_friend_request


app_name = 'accounts'

urlpatterns = [
    path('profiles/', views.UserListAPIView.as_view(), name="profile_add"),
    path('send_friend_request/<int:userID>/', send_friend_request, name='send friend request'),
    path('accept_friend_request/<int:requestID>/', accept_friend_request, name='accept friend request'),
]