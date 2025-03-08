from django.urls import path
from . import views

urlpatterns = [
    path('sellproducts/', views.sellProducts, name='sellproducts'),
    path('getallsales/', views.getAllSales, name='getallsales'),
    path('getsalestoday/', views.getSalesToday, name='getsalestoday'),
    path('getsalesthisweek/', views.getSalesThisWeek, name='getsalesthisweek'),
    path('getsalesthismonth/', views.getSalesThisMonth, name='getsalesthismonth'),
    path('deletesale/', views.deleteSale, name='deletesale'),
    path('getsalesbysellerid/', views.getSalesBySellerID, name='getsalesbysellerid')
]