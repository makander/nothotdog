from django.shortcuts import render, redirect
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from rest_framework import response, status, viewsets, parsers, status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.views import View
from django.views.generic import CreateView, TemplateView, DetailView, ListView, UpdateView
from rest_framework.generics import get_object_or_404

from rest_framework.decorators import action

from .models import Image
from .serializers import ImageSerializer, UserSerializer, ImageDataSerializer, BasicImageSerializer, FullImageSerializer


class Index(TemplateView):
    template_name = 'index.html'


class SPAIndex(TemplateView):
    template_name = 'nothotdog/spa/index.html'


class Home(TemplateView):
    template_name = 'home.html'


class ImageCreate(LoginRequiredMixin, CreateView):
    model = Image
    fields = ['description', 'image']

    def form_valid(self, form):
        new_image = form.save(commit=False)
        new_image.created_by = self.request.user
        new_image.save()
        print(dir(new_image))
        print(new_image.id)
        return redirect('image', pk=new_image.pk, permanent=True)


class ImageDetail(DetailView):
    model = Image


class Login(View):
    def get(self, request):

        return render(request, 'login.html')

    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('next')

        return redirect('')


class ImageUpdate(LoginRequiredMixin, UpdateView):
    model = Image
    fields = ['description']
    template_name = "nothotdog/image_update_form.html"


class ImageList(ListView):
    model = Image
    paginate_by = 20
    template_name = "nothotdog/image_list.html"


class MyImages(LoginRequiredMixin, ListView):
    paginate_by = 20
    template_name = "nothotdog/my_images.html"

    def get_queryset(self):
        return Image.objects.filter(created_by=self.request.user)


class Logout(View):
    def get(self, request):
        logout(request)
        return render(request, 'index.html')


class ImageRestView(viewsets.ModelViewSet):
    queryset = Image.objects.filter(valid=True)
    serializer_class = ImageSerializer

    def get_serializer_class(self):
        if self.request.user.is_superuser:
            return FullImageSerializer
        else:
            return BasicImageSerializer

    def update(self, request, pk, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        print(self)
        instance = get_object_or_404(Image.objects.all(), id=pk)
        print(instance)
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    @action(detail=True, methods=['PUT'], serializer_class=ImageDataSerializer,
            parser_classes=[parsers.MultiPartParser],)
    def image(self, request, pk):
        obj = self.get_object()

        serializer = self.serializer_class(obj, data=request.data,
                                           partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,
                        status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        # Include the owner attribute directly, rather than from request data.
        serializer.save(created_by=self.request.user,)
        # Perform a custom post-save action.

    @action(detail=True, methods=['PUT'], serializer_class=ImageDataSerializer)
    def flag(self, request, pk):
        obj = self.get_object()

        serializer = self.serializer_class(obj, data=request.data,
                                           partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,
                        status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['GET'], serializer_class=ImageSerializer)
    def get_next(self, request, pk):
        image = get_object_or_404(Image.objects.all(), id=pk)
        next_image = image.get_next_by_created_at()
        serializer = self.get_serializer_class()
        return Response(serializer(next_image).data)

    @action(detail=True, methods=['GET'], serializer_class=ImageSerializer)
    def get_prev(self, request, pk):
        image = get_object_or_404(Image.objects.all, id=id)
        return image.get_prev_by_date_posted()
