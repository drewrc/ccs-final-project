from django.urls import path
from .views import like_story, GetUserStories, RecentStoriesFromFriendsView, UserUpdateRetrieveDeleteView, get_user_timeline, UserStoryListCreateView, UserTimelineListCreateView, create_user_timeline

app_name = "timelines"

urlpatterns = [
    path("stories/", UserStoryListCreateView.as_view(), name="user_stories"),
    path("timelines/", get_user_timeline, name="user_timelines"),
    path("view_timelines/", UserTimelineListCreateView.as_view(), name="view_timelines"),
    path("edit_story/<int:pk>/", UserUpdateRetrieveDeleteView.as_view(), name="edit_story"),
    path("user_stories/", GetUserStories.as_view(), name="user_stories"),
    path("friend_stories/", RecentStoriesFromFriendsView.as_view(), name="friend_stories"),
    path("stories/<int:pk>/like/", like_story, name="like_story"),
]