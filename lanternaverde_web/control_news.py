from .models import News, Empresa
import json
from django.http import HttpResponse, HttpResponseBadRequest
from .serializers import NewsSerializer
from .utils.jsonresponse import JSONResponse
from django.utils import timezone


def listar_noticias(request, amount=0):
    """
    Function that lists an amount of news (full list if no amount has been passed)
    """
    if request.method == 'GET':
        noticias = News.objects.all() if amount == 0 else News.objects.all()[:int(amount)]
        ser_news = NewsSerializer(noticias, many=True).data
        ser_return = {
            "noticias": ser_news
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()


def listar_noticias_empresa(request, company):
    """
    Function that lists the news of a company
    """
    if request.method == 'GET':
        empresa = Empresa.objects.get(pk=company)
        noticias = empresa.noticias
        ser_news = NewsSerializer(noticias, many=True).data
        ser_return = {
            "noticias": ser_news
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()


def detalhar_noticia(request, slug):
    """
    Function that details a news
    """
    if request.method == 'GET':
        noticia = News.objects.get(slug=slug)
        ser_news = NewsSerializer(noticia).data
        ser_return = {
            "noticias": ser_news
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()


def publicar_noticia(request):
    """
    Function that posts a news
    """
    if request.method == 'POST':
        data = json.loads(request.body)
        noticia = News.objects.create(title=data['title'],
                                      abstract=data['abstract'],
                                      company=request.user.empresa,
                                      body=data['body'])
        noticia.save()
        return HttpResponse("Notícia publicada com sucesso", status=201)
    return HttpResponseBadRequest()


def editar_noticia(request):
    """
    Function that updates a news
    """
    if request.method == 'POST':
        data = json.loads(request.body)
        noticia = News.objects.get(pk=data['newsid'])
        if noticia.company != request.user.empresa:
            return HttpResponse("Esta notícia não é da sua empresa", status=403)
        noticia.title = data['title']
        noticia.abstract = data['abstract']
        noticia.body = data['body']
        noticia.edit_date = timezone.now()
        noticia.save()
        return HttpResponse("Noticia atualizada com sucesso", status=201)
    return HttpResponseBadRequest()
