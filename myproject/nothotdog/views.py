from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate, login, logout
from django.views import View
from .models import Image
from django.views.generic import CreateView, TemplateView, DetailView, UpdateView

class Index(TemplateView):
    template_name = 'index.html'


class Home(TemplateView):
    template_name = 'home.html'


class ImageCreate(CreateView):
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(ImageCreate, self).dispatch(*args, **kwargs)

    model = Image
    fields = ['description', 'image_location']

    def form_valid(self, form):
        new_image = form.save(commit=False)
        new_image.created_by = self.request.user
        new_image.save()
        print(dir(new_image))
        print(new_image.id)
        return redirect('image', pk=new_image.pk, permanent=True)


class ImageDetail(DetailView):
    model = Image    

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['image'] = Image.objects.filter(pk=self.object.pk)
        print(context)
        return context


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


class ImageUpdate(UpdateView):
    model = Image
    fields = ['description']
    template_name = "image_update_form.html"
