from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate, login, logout
from django.views import View
from .models import Image
from django.views.generic import CreateView, TemplateView, DetailView, UpdateView, ListView


class Index(TemplateView):
    template_name = 'index.html'


class Home(TemplateView):
    template_name = 'home.html'


class ImageCreate(CreateView):
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(ImageCreate, self).dispatch(*args, **kwargs)

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
            return redirect('home')

        return redirect('')


class ImageUpdate(UpdateView):
    model = Image
    fields = ['description']
    template_name = "nothotdog/image_update_form.html"


class ImageList(ListView):
    model = Image
    paginate_by = 20
    template_name = "nothotdog/image_list.html"


class MyImages(ListView):
    paginate_by = 20
    template_name = "nothotdog/my_images.html"

    def get_queryset(self):
        return Image.objects.filter(created_by=self.request.user)


class Logout(View):
    def get(self, request):
        logout(request)
        return render(request, 'index.html')
