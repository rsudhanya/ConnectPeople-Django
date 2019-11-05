from django.urls import path
from . import views

urlpatterns = [path("", views.index, name="index"),
 path('<str:frndname>/', views.index, name='index')]