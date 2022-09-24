"""
Serializers Models for Django REST Framework
"""
from rest_framework import serializers

from .models import NotificacaoAdm, Pergunta, Relatorio, Usuario, Administrador, Analista, AvaliacaoAnalista, Questao, SolicitacaoAnalise, Empresa

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

class QuestaoSerializer(serializers.ModelSerializer):
    """
    Serialization for Questao Model
    """
    question = PerguntaSerializer()
    class Meta:
        """Questao serialization metadata"""
        model = Questao
        fields = '__all__'

class EmpresaSerializer(serializers.ModelSerializer):
    """
    Serialization for Empresa Model
    """
    
    class Meta:
        """Empresa serialization metadata"""
        model = Empresa
        fields = '__all__'


class AvaliacaoAnalistaSerializer(serializers.ModelSerializer):
    """
    Serialization for AvaliacaoAnalista Model
    """
    questao_set = QuestaoSerializer(many=True)
    company = EmpresaSerializer
    class Meta:
        """AvaliacaoAnalista serialization metadata"""
        model = AvaliacaoAnalista
        fields = '__all__'
        related_object = 'questao'

class SolicitacoesAnaliseSerializer(serializers.ModelSerializer):
    """
    Serialization for SolicitacaoAnalise Model
    """
    analises = AvaliacaoAnalistaSerializer(many=True)
    empresa = EmpresaSerializer()
    class Meta:
        """SolicitacaoAnalise metadata"""
        model = SolicitacaoAnalise
        fields = '__all__'
        related_object = ['analises', 'empresa']

class RelatorioSerializer(serializers.ModelSerializer):
    """
    Serialization for Relatorio Model
    """
    class Meta:
        """Relatorio metadata"""
        model = Relatorio
        fields = '__all__'

class NotificacoesAdmSerializer(serializers.ModelSerializer):
    """
    Serialization for NotificacaoAdm Model
    """
    class Meta:
        """Relatorio metadata"""
        model = NotificacaoAdm
        fields = '__all__'