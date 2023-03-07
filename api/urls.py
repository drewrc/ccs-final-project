from django.urls import include, path

app_name = "api_v1"

urlpatterns = [
    path('', include('accounts.urls', namespace="accounts")),
    path('', include('conversations.urls', namespace="conversations")),
    # path('newapp/', include('newapp.urls', namespace="newapp")),
]