from django.urls import path
from .views import user_edit_story, get_user_timeline, UserStoryListCreateView, UserTimelineListCreateView, create_user_timeline

app_name = "timelines"

urlpatterns = [
    path("stories/", UserStoryListCreateView.as_view(), name="user_stories"),
    path("timelines/", get_user_timeline, name="user_timelines"),
    path("view_timelines/", UserTimelineListCreateView.as_view(), name="view_timelines"),
    path("edit_story/<int:pk>/", user_edit_story, name="edit_story")
]