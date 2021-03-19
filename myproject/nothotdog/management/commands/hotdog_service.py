from django.core.management.base import BaseCommand, CommandError
from myproject.nothotdog.models import Image
import pika
import json


class Command(BaseCommand):

    def handle(self, *args, **options):
        connection = pika.BlockingConnection(
            pika.ConnectionParameters(host='localhost'))
        channel = connection.channel()

        channel.queue_declare(queue='image-validated')
        print("starting")

        def callback(ch, method, properties, body):
            substr = "false"
            stringified = body.decode('ascii')
            data = json.loads(body.decode('utf-8'))

            if substr in stringified:
                obj = Image.objects.get(pk=data['id'])
                obj.valid = False
                obj.save(update_fields=['valid'])
                return

            else:
                obj = Image.objects.get(pk=data['id'])
                obj.valid = True
                obj.save(update_fields=['valid'])
                return

        channel.basic_consume(
            queue='image-validated', on_message_callback=callback, auto_ack=True)

        channel.start_consuming()
