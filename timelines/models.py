from django.db import models
from django.conf import settings

# Create your models here.


class Timeline(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name="timeline", on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class Story(models.Model):
    img = models.ImageField(upload_to='images/', blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="author",
                               on_delete=models.CASCADE, blank=True)
    text = models.TextField(max_length=500, default='', blank=False)
    timeline = models.ForeignKey(
        Timeline, related_name="timeline", on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.text[:50]
