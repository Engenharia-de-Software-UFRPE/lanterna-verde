from .models import News, Empresa
import json
from django.http import HttpResponse, HttpResponseBadRequest
from .serializers import NewsSerializer
from .utils.jsonresponse import JSONResponse


def listar_noticias(request):
    if request.method == 'GET':
        noticias = News.objects.all()
        ser_news = NewsSerializer(noticias, many=True).data
        ser_return = {
            "noticias": ser_news
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()


def listar_noticias_empresa(request, company):
    if request.method == 'GET':
        empresa = Empresa.objects.get(pk=company)
        noticias = empresa.noticias
        ser_news = NewsSerializer(noticias, many=True).data
        ser_return = {
            "noticias": ser_news
        }
        return JSONResponse(ser_return, status=200)
    HttpResponseBadRequest()


def detalhar_noticia(request, company, slug):
    if request.method == 'GET':
        empresa = Empresa.objects.get(pk=company)
        noticia = empresa.noticias.get(slug=slug)
        ser_news = NewsSerializer(noticia).data
        ser_return = {
            "noticias": ser_news
        }
        return JSONResponse(ser_return, status=200)
    HttpResponseBadRequest()
