from .models import News, Empresa
import json
from django.http import HttpResponse, HttpResponseBadRequest
from .serializers import NewsSerializer
from .utils.jsonresponse import JSONResponse


def listar_noticias(request, amount=0):
    if request.method == 'GET':
        noticias = News.objects.all() if amount == 0 else News.objects.all()[:int(amount)]
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


def publicar_noticia(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        noticia = News.objects.create(title=data['title'],
                                      abstract=data['abstract'],
                                      company=Empresa.objects.get(pk=data['companyid']),
                                      body=data['body'])
        noticia.save()
        return HttpResponse("Notícia publicada com sucesso", status=201)
    return HttpResponseBadRequest()
