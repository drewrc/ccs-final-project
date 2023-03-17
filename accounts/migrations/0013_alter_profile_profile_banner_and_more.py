# Generated by Django 4.1.7 on 2023-03-16 15:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0012_profile_coordinates'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='profile_banner',
            field=models.ImageField(blank=True, default='/media/images/defaultbanner_Ar155VZ.png', upload_to='images/'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='profile_pic',
            field=models.ImageField(blank=True, default='media/images/profilepicdefault.png', upload_to='images/'),
        ),
    ]