# Generated by Django 3.1.7 on 2021-03-17 16:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nothotdog', '0006_image_valid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='valid',
            field=models.BooleanField(null=True),
        ),
    ]