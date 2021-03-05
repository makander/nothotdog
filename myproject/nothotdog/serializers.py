from rest_framework import serializers

from .models import Image


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'
    
        def update(self, instance, validated_data):
            instance.name = validated_data.pop('name')
            instance.save()
            return instance
        
        