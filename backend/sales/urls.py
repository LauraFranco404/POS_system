from django.urls import path
from . import views

urlpatterns = [
    path('sellproducts/', views.sellProducts, name='sellproducts'),
]