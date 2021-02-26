from django.shortcuts import render, redirect, reverse
from django.contrib.auth import authenticate, login



def index(request):

    return render(request, 'nothotdog/index.html')


def home(request):

    return render(request, 'nothotdog/home.html')


def my_view(request):
    if request.method == 'GET':
        return render(request, 'nothotdog/login.html')

    elif request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
    
        # Return an 'invalid login' error message.
        