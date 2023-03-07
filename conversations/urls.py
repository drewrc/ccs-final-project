from django.urls import path
from .views import UserMessageListCreate, ConversationListCreate

app_name="conversations"

urlpatterns = [
    path('messages/', UserMessageListCreate.as_view(), name="user_messages"),
    path('conversations/', ConversationListCreate.as_view(), name="user_conversations"),
]