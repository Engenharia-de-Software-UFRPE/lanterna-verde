"""
Serializers Models for Django REST Framework
"""
from rest_framework import serializers
from .models import Questao, Usuario, Administrador, Analista


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

class QuestaoSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serialization for Questao Model
    """
    
    class Meta:
        """Analista serialization metadata"""
        model = Questao
        exclude = ('url', )