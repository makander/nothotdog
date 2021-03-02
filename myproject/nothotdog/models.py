from django.db import models
from django.contrib.auth.models import User


class Picture(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=40)
    description = models.TextField(max_length=160, blank=True)
    location = models.ImageField(upload_to='images/', blank=True, null=True)
    
    def __str__(self):
        return self.title