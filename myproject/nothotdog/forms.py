from .models import Picture
from django import forms


class UploadPictureForm(forms.ModelForm):
    class Meta:
        model = Picture
        fields = ['description', 'location']