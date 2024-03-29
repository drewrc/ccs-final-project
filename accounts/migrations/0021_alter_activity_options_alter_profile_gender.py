# Generated by Django 4.1.7 on 2023-03-23 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0020_alter_profile_user'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='activity',
            options={'verbose_name_plural': 'activities'},
        ),
        migrations.AlterField(
            model_name='profile',
            name='gender',
            field=models.CharField(blank=True, choices=[('Male', 'Male'), ('Female', 'Female'), ('Non-binary', 'Non-binary'), ('Transgender', 'Transgender'), ('Other', 'Other')], max_length=20),
        ),
    ]
