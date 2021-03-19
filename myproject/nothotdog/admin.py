from django.contrib import admin
from .models import Image
from django import forms

# Register your models here.


class ImageForm(forms.ModelForm):

    class Meta:
        model = Image
        fields = ['name', 'valid', 'description']


def make_valid(modeladmin, request, queryset):
    queryset.update(valid=True)
    make_valid.short_description = "Mark selected images as hotdogs"


def make_invalid(modeladmin, request, queryset):
    queryset.update(valid=False)
    make_invalid.short_description = "Mark selected images as not being hotdogs"


class ImageAdmin(admin.ModelAdmin):
    list_display = ['name', 'valid']
    actions = [make_valid, make_invalid]


admin.site.register(Image, ImageAdmin)
