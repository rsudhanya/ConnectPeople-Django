from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [path("register", views.register, name="register"),
               path("login", views.login, name="login"),
               path("logout", views.logout, name="logout"),
               path("about", views.about, name="about"),
               path("my_account", views.my_account, name="my_account"),
               path('password_change', auth_views.PasswordChangeView.as_view()),
               path('password_change/done', views.password_change_done, name="password_change_done"),]
