from django.urls import path
from . import views
from .views import CurrentUserListAPIView, UserRetrieveUpdateDestroyAPIView,UserProfileListAPIView, send_match_request, accept_match_request, match_request_count, UserProfileView, buddies_list


app_name = 'accounts'

urlpatterns = [
    path('profiles/', views.UserListAPIView.as_view(), name="profile_add"),
    path('send_match_request/<int:userID>/', send_match_request, name='send_friend_request'),
    path('accept_match_request/<int:requestID>/', accept_match_request, name='accept_friend_request'),
    path('match_request_count/', match_request_count, name='match_request_count'),
    path('buddies_list/', buddies_list, name='buddies_list'),
    path('users/<int:pk>/', UserProfileView, name="user_profile_select" ),
    path('send-message/<int:user_id>/', views.send_message, name='send_message'),
    path('user/<int:pk>/', UserRetrieveUpdateDestroyAPIView.as_view(), name='user_update'),
    path('new_user/', UserProfileListAPIView.as_view(), name='new_profile'),
    path('current_user/', CurrentUserListAPIView.as_view(), name='auth_user'),
]
