from rest_framework import serializers
from .models import Image
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],

        )
        return user

    class Meta:
        model = User
        fields = ('password', 'username',)


class BasicImageSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='created_by', read_only=True)

    class Meta:
        model = Image
        fields = ['name', 'description', 'user',
                  'image', 'id', 'created_at', 'valid']
        read_only_fields = ['valid', 'created_at']


class FullImageSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='created_by', read_only=True)

    class Meta:
        model = Image
        fields = ['name', 'description', 'user', 'id', 'image', 'valid']
        read_only_fields = ['created_at']


class ImageSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='created_by', read_only=True)

    class Meta:
        model = Image
        fields = ['name', 'description', 'user',
                  'id', 'image', 'valid']

        def update(self, instance, validated_data):
            instance.name = validated_data.pop('name')
            instance.save()
            return instance


class ImageDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image']
