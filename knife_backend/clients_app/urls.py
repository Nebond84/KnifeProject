from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientViewSet, client_list_view,homepage


router = DefaultRouter()
router.register(r'clients', ClientViewSet)
urlpatterns = [
    path('clients/', ClientViewSet.as_view({'get': 'list', 'post': 'create'}), name='client-list'),
    path('clients/<int:pk>/', ClientViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='client-detail'),  # API
  
   
    
]