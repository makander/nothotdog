from rest_framework.authtoken.models import Token
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Image
import json
import pika


@receiver(post_save, sender=Image)
def nothotdog(sender, instance, **kwargs):
    id = str(instance.id)

    if instance.image:
        message = {
            "image": instance.image.name,
            "id": id,
            "valid": instance.valid
        }

        connection = pika.BlockingConnection(
            pika.ConnectionParameters(host='localhost'))
        channel = connection.channel()
        channel.queue_declare(queue='hotdog')

        channel.basic_publish(exchange='',
                              routing_key='image-uploaded',
                              body=json.dumps(message))


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
