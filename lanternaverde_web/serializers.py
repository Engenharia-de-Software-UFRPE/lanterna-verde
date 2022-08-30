"""
Serializers Models for Django REST Framework
"""
from rest_framework import serializers
from .models import Pergunta, Usuario, Administrador, Analista, AvaliacaoAnalista, Questao


class UsuarioSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serialization for Usuario Model
    """

    class Meta:
        """Usuario serialization metadata"""
        model = Usuario
        exclude = ('url', )

class AdministradorSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serialization for Administrador Model
    """

    class Meta:
        """Administrador serialization metadata"""
        model = Administrador
        exclude = ('url', )

class AnalistaSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serialization for Analista Model
    """

    class Meta:
        """Analista serialization metadata"""
        model = Analista
        exclude = ('url', )

class PerguntaSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serialization for Questao Model
    """
    
    class Meta:
        """Pergunta serialization metadata"""
        model = Pergunta
        exclude = ('url', )


class AvaliacaoAnalistaSerializer(serializers.ModelSerializer):
    """
    Serialization for AvaliacaoAnalista Model
    """

    class Meta:
        """AvaliacaoAnalista serialization metadata"""
        model = AvaliacaoAnalista
        fields = "__all__"


class QuestaoSerializer(serializers.ModelSerializer):
    """
    Serialization for Questao Model
    """

    class Meta:
        """Questao serialization metadata"""
        model = Questao
        fields = '__all__'
