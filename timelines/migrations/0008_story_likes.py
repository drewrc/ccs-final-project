# Generated by Django 4.1.7 on 2023-03-20 01:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timelines', '0007_story_timeline'),
    ]

    operations = [
        migrations.AddField(
            model_name='story',
            name='likes',
            field=models.IntegerField(default=0),
        ),
    ]
