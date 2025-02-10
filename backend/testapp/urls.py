from django.urls import path
from . import views

urlpatterns = [
    path('testapp/', views.test, name='testapp'),
]