# Generated by Django 3.1.7 on 2021-03-24 09:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210323_2306'),
    ]

    operations = [
        migrations.AddField(
            model_name='barista',
            name='online',
            field=models.BooleanField(default=False),
        ),
    ]
