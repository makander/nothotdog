from django.db import models
from django.contrib.auth.models import User

#class RegisteredUser(models.Model)


class Picture(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=40)
    description = models.CharField(max_length=160)


