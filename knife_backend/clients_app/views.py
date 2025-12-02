from django.shortcuts import render
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import Client
from .serializers import ClientSerializer
from django.http import HttpResponse, HttpResponseServerError
from django.conf import settings
import pathlib

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name', 'email','desired_model']
    

def client_list_view(request):
    clients = Client.objects.all()  # Получите всех клиентов из базы данных
    return render(request, 'client_list.html', {'clients': clients})


def spa_index(request):
    index_file = pathlib.Path(settings.BASE_DIR)/"build"/"index.html"
    try:
        return HttpResponse(index_file.read_text(encoding="utf-8"), content_type="text/html")
    except FileNotFoundError:
        return HttpResponseServerError(
            "<h1>index.html not found</h1>"
            "<p>Run <code>npm run build</code> in the knife_project directory.</p>",
            content_type="text/html",
        )
def homepage(request):
    return render(request, 'homepage.html') 
# Create your views here.
