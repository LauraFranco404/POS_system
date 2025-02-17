from django.urls import path
from . import views

urlpatterns = [
    path('addseller/', views.addSeller, name='addseller'),
    path('deleteseller/', views.deleteSeller, name='deleteseller'),
    path('updateseller/', views.updateSeller, name='updateseller'),
    path('getallsellers/', views.getAllSellers, name='getallsellers'),
    path('getsellerbyid/', views.getSellerById, name='getseller'),
]