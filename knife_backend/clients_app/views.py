from django.shortcuts import render
from rest_framework import viewsets
from .models import Client
from .serializers import ClientSerializer
from django.http import HttpResponse, HttpResponseServerError
from django.conf import settings
import pathlib

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


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
