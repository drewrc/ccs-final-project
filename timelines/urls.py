from django.urls import path
from .views import UserUpdateRetrieveDeleteView, get_user_timeline, UserStoryListCreateView, UserTimelineListCreateView, create_user_timeline

app_name = "timelines"

urlpatterns = [
    path("stories/", UserStoryListCreateView.as_view(), name="user_stories"),
    path("timelines/", get_user_timeline, name="user_timelines"),
    path("view_timelines/", UserTimelineListCreateView.as_view(), name="view_timelines"),
    path("edit_story/<int:pk>/", UserUpdateRetrieveDeleteView.as_view(), name="edit_story")
]