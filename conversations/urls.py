from django.urls import path
from .views import UserMessageListCreate, ConversationListCreate, UserMessageList, UserMessageRetrieveUpdateDestroy

app_name="conversations"

urlpatterns = [
    path('messages/', UserMessageListCreate.as_view(), name="user_messages"),
    path('conversations/', ConversationListCreate.as_view(), name="user_conversations"),
    # path('messages/<int:pk>/', UserMessageList.as_view(), name='user_message_list'),
    path('messages/<int:pk>', UserMessageRetrieveUpdateDestroy.as_view(), name='user_edit_delete')
]