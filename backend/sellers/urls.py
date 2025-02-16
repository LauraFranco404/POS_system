from django.urls import path
from . import views

urlpatterns = [
    path('addseller/', views.addseller, name='addseller'),
    path('deleteseller/', views.deleteseller, name='deleteseller'),
    path('updateseller/', views.updateseller, name='updateseller'),
    path('getsellers/', views.getsellers, name='getsellers'),
    path('getseller/', views.getseller, name='getseller'),
]