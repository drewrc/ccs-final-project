from django.urls import path
from .views import UserStoryListCreateView, UserTimelineListCreateView, create_user_timeline

app_name = "timelines"

urlpatterns = [
    path("stories/", UserStoryListCreateView.as_view(), name="user_stories"),
    path("timelines/", create_user_timeline, name="user_timelines"),
    path("view_timelines/", UserTimelineListCreateView.as_view(), name="view_timelines"),
]