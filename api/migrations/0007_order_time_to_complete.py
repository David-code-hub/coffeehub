# Generated by Django 3.1.7 on 2021-03-25 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_beverage'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='time_to_complete',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
