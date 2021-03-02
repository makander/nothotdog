from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.views import View
from .models import Picture
from django.views.generic import CreateView, TemplateView, DetailView
from django.core.files.storage import FileSystemStorage
from .utils import generate_uuid4_filename 
from .forms import UploadPictureForm
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy

class Index(TemplateView):
    template_name = 'index.html'


class UploadPicture(CreateView):
    model = Picture
    form_class = UploadPictureForm()
    success_url = reverse_lazy('home')
    template_name = 'home.html'


class Home(View):
    
    def get(self, request):
        form = UploadPictureForm()
        return render(request, 'home.html', {'form': form})


    def post(self, request, *args, **kwargs):

        form = UploadPictureForm(request.POST, request.FILES)
        print(form)

        #uploaded_file = request.FILES['picture']
        #title = request.FILES['picture'].name
        #fs = FileSystemStorage()
        #new_pic = Picture()
        #new_pic.title = generate_uuid4_filename(title)
        #new_pic.created_by = request.user
        #new_pic.save()
        
        #fs.save(new_pic.title, uploaded_file)
        return render(request, 'home.html')


        #else:
        #    form = UploadPictureForm()
       # return render(request, 'home.html', {'form': form})

class Login(View):
    def get(self, request):

        return render(request, 'login.html')

    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')


class PictureDetails(DetailView):
    model = Picture
    template_name = 'picture.html'
    context_object_name = 'picture'


""" def get_pictures_by_user():


def list_pictures():


def delete_picture():


def edit_picture(): """

"""     if request.method == 'GET':
        return render(request, 'nothotdog/login.html')

    elif request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')

        else:
            return redirect('index') """


            #def logout_view(request):
#   logout(request)
# #  return redirect('index') """
# class UploadPicture(View):