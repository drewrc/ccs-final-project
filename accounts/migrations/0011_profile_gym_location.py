# Generated by Django 4.1.7 on 2023-03-16 00:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0010_user_user_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='gym_location',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
