# lanterna-verde

Projeto da disciplina de Engenharia de Software da Universidade Federal Rural de Pernambuco (UFRPE) - 2021.2

## Setup

### 1.Instalando as dependências

Com o Python 3.10 instalado e corretamente funcionando na sua PATH, faça:

> Antes de iniciar, **para quem está trabalhando com Python pela primeira vez**, recomendamos o uso de um Ambiente Virtual Python para esse projeto: <https://www.treinaweb.com.br/blog/criando-ambientes-virtuais-para-projetos-python-com-o-virtualenv>. Após criar a `venv` e acessar o seu ambiente virtual, você pode instalar os pacotes do projeto como se segue:

```console
pip install -r requirements.txt
```

Após instaladas as dependências pela primeira vez, não será mais necessário instalá-las novamente, exceto se durante o decorrer do projeto uma nova dependência seja adicionada.

### 2.Configurando o Banco de dados local

Inicialmente, é necessário criar um banco de dados local do projeto em sua máquina. O framework Django consegue montar o banco de dados, logo crie seu BD executando os comandos:

```console
python manage.py makemigrations
python manage.py migrate --run-syncdb
```

> Sempre que você fizer alguma alteração nos modelos do Banco de Dados é necessário utilizar esses comandos, caso haja conflito use a flag `--run-syncdb` no comando `migrate`.

### 3.Criando um super-usuário para a tela de administração

Inicialmente, é interessante ter acesso ao ambiente de administração do projeto Django, para isso é necessário criar um `superuser`, faça isso com:

```console
python manage.py createsuperuser
```

Siga as instruções quando notificado e você irá criar o usuário

### 4. Iniciando a aplicação web

Simples, rápido e fácil:

```console
python manage.py runserver
```

Acesse: <http://localhost:8000/>
Para acessar o ambiente de Administração: <http://localhost:8000/>
