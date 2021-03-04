from django.urls import path
from . import views
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path('', views.Index.as_view(), name="index"),
    path('home/', login_required(views.Home.as_view()), name="home"),
    path('login/', views.Login.as_view(), name="login"),
    path('logout', views.Logout.as_view(), name="logout"),
    path('image_form/', views.ImageCreate.as_view()),
    path('image/<uuid:pk>/', views.ImageDetail.as_view(), name="image"),
    path('image/<uuid:pk>/image_update_form/', views.ImageUpdate.as_view(), name="imageupdate"),
    path('images/', views.ImageList.as_view(), name="images"),
    path('my_images/', views.MyImages.as_view(), name="myimages")
]
