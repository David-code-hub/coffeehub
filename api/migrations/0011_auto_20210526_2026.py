# Generated by Django 3.1.7 on 2021-05-26 18:26

import cloudinary.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0010_order_placed'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='comment',
            field=models.TextField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='review',
            name='love',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='barista',
            name='profile_image',
            field=cloudinary.models.CloudinaryField(max_length=255, verbose_name='profile_image'),
        ),
        migrations.AlterField(
            model_name='customer',
            name='profile',
            field=cloudinary.models.CloudinaryField(max_length=255, verbose_name='profile'),
        ),
    ]
