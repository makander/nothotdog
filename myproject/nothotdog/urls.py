from django.urls import path
from . import views
from django.views.generic import TemplateView, View

urlpatterns = [
    path('', views.Index.as_view(), name="index"),
    path('home/', views.Home.as_view(), name="home"),
    path('login/', views.Login.as_view(), name="login"),
    path('logout', views.Index.as_view(), name="logout"),
]

"""  path('home/', views.Home.as_view(), name="home"),
    path('login/', views.my_view, name="login"),
    path('logout/', views.logout_view, name="logout") """