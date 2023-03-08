from django.urls import path
from .views import UserStoryListCreateView, UserTimelineListCreateView

app_name = "timelines"

urlpatterns = [
    path("stories/", UserStoryListCreateView.as_view(), name="user_stories"),
    path("timelines/", UserTimelineListCreateView.as_view(), name="user_timelines"),
]