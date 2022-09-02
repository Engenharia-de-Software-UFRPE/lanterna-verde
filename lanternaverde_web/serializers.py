"""
Serializers Models for Django REST Framework
"""
from rest_framework import serializers
from .models import Pergunta, SolicitacaoAnalise, Usuario, Administrador, Analista


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

class SolicitacoesAnaliseSerializer(serializers.ModelSerializer):
    """
    Serialization for SolicitacaoAnalise Model
    """

    class Meta:
        """SolicitacaoAnalise metadata"""
        model = SolicitacaoAnalise
        fields = '__all__'
