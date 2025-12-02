from django.contrib import admin
from django.urls import path, include, re_path
from clients_app import views
from clients_app.views import spa_index
from clients_app.views import homepage,ClientViewSet, client_list_view


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("clients_app.urls")),
    path('', homepage, name='home'),
    path('clients/html/', client_list_view, name='client-list-html'),
]