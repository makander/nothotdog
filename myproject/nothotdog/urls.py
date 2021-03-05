from django.urls import path, include
from . import views
from django.contrib.auth.decorators import login_required
from rest_framework import routers, serializers, viewsets
from django.contrib.auth import views as auth_views


router = routers.DefaultRouter()
router.register(r'images', views.ImageListView),


urlpatterns = [
    path('', views.Index.as_view(), name="index"),
    path('home/', login_required(views.Home.as_view()), name="home"),
    path('login/', auth_views.LoginView.as_view(template_name="login.html")),
    path('logout', views.Logout.as_view(), name="logout"),
    path('image_form/', views.ImageCreate.as_view()),
    path('image/<uuid:pk>/', views.ImageDetail.as_view(), name="image"),
    path('image/<uuid:pk>/image_update_form/', views.ImageUpdate.as_view(), name="imageupdate"),
    path('images/', views.ImageList.as_view(), name="images"),
    path('my_images/', views.MyImages.as_view(), name="myimages"),
    #path('api/images', views.ImageListView.as_view({'get': 'list'}))
    path('api/', include(router.urls))
]

