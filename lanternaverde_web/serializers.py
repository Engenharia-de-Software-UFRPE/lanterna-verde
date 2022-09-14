"""
Serializers Models for Django REST Framework
"""
from rest_framework import serializers
from .models import Pergunta, Usuario, Administrador, Analista, AvaliacaoAnalista, Questao, Empresa, PacoteAnalise



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


class QuestaoSerializer(serializers.ModelSerializer):
    """
    Serialization for Questao Model
    """
    question = PerguntaSerializer()
    class Meta:
        """Questao serialization metadata"""
        model = Questao
        fields = '__all__'


class AvaliacaoAnalistaSerializer(serializers.ModelSerializer):
    """
    Serialization for AvaliacaoAnalista Model
    """
    questao_set = QuestaoSerializer(many=True)
    class Meta:
        """AvaliacaoAnalista serialization metadata"""
        model = AvaliacaoAnalista
        fields = '__all__'
        related_object = 'questao'

class EmpresaSerializer(serializers.ModelSerializer):
    """
    Serialization for Empresa Model
    """
    
    class Meta:
        """Empresa serialization metadata"""
        model = Empresa
        fields = '__all__'

class PacoteAnaliseSerializer(serializers.ModelSerializer):
    """
    Serialization for PacoteAnalise Model
    """
    
    class Meta:
        model = PacoteAnalise
        