from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse


class Image(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=40)
    description = models.TextField(max_length=160, blank=True)
    imageLocation = models.ImageField(upload_to='images/', blank=True, null=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('image_detail', kwargs={'pk': self.pk})