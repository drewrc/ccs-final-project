from django.urls import path
from .views import UnreadMessages, UserMessageListCreate, MarkMessageAsRead, ConversationListCreate, UserMessageList, UserMessageRetrieveUpdateDestroy

app_name="conversations"

urlpatterns = [
    path('messages/', UserMessageListCreate.as_view(), name="user_messages"),
    path('conversations/', ConversationListCreate.as_view(), name="user_conversations"),
    # path('messages/<int:pk>/', UserMessageList.as_view(), name='user_message_list'),
    path('read_messages/<int:message_id>/', MarkMessageAsRead.as_view(), name="user_read"),
    path('messages/<int:pk>/', UserMessageRetrieveUpdateDestroy.as_view(), name='user_edit_delete'),
    path('unread_messages/', UnreadMessages.as_view(), name="unread_messages"),
]