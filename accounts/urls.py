from django.urls import path
from . import views
from .views import send_match_request, accept_match_request, match_request_count


app_name = 'accounts'

urlpatterns = [
    path('profiles/', views.UserListAPIView.as_view(), name="profile_add"),
    path('send_match_request/<int:userID>/', send_match_request, name='send_friend_request'),
    path('accept_match_request/<int:requestID>/', accept_match_request, name='accept_friend_request'),
    path('match_request_count/', match_request_count, name='match_request_count')
]

#, 'POST'
# <int:userID>/