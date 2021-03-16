from rest_framework import serializers

from .models import Image
from django.contrib.auth.models import User


class ImageSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Image
        fields = ['name', 'description', 'id']

        def update(self, instance, validated_data):
            instance.name = validated_data.pop('name')
            instance.save()
            return instance


class ImageDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image']


class UserSerializer(serializers.ModelSerializer):

    image_set = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('username', 'image_set')
