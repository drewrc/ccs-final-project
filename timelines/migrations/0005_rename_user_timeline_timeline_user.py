# Generated by Django 4.1.7 on 2023-03-13 16:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('timelines', '0004_alter_timeline_user_timeline'),
    ]

    operations = [
        migrations.RenameField(
            model_name='timeline',
            old_name='user_timeline',
            new_name='user',
        ),
    ]