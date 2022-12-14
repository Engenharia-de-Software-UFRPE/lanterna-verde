# lanterna-verde

O projeto `lanterna-verde` trata-se de um sistema de avaliação do nível de práticas de _greenwashing_ de uma organização ou produto.

**Greenwashing** é o termo definido pelo ato de disseminar desinformação aos consumidores sobre as práticas ambientais de uma empresa ou produto quando, na verdade, tais práticas adotadas não beneficiam o meio ambiente. O `lanterna-verde` busca analisar e diagnosticar empresas e produtos que praticam o greenwashing e, a partir disso, indicar uma melhor postura em relação à prática em questão. Além disso, o sistema fornecerá certificações para empresas que não praticam o greenwashing.

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
python manage.py makemigrations lanternaverde_web
python manage.py migrate
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

## História

O lanterna verde é um projeto da disciplina de Engenharia de Software do curso de Bacharelado em Ciências da Computação (BCC) do Departamento de Computação (DC) da  Universidade Federal Rural de Pernambuco (UFPE). O projeto foi idealizado em 2022 pelos professores Marcelo Marinho (DC), Marcos Sobral (Departamento de Administração - DADM) e Ana Regina (DADM). Além dos idealizadores, o projeto conta com a participação dos alunos da turma de BCC do semestre 2021.2 no desenvolvimento

## Nosso time

| Joyce e cia      | Megaman e os Reploids       | Time de Sebastião |
|:----------------:|:-------------------:|:-----------------:|
| <img src="https://avatars.githubusercontent.com/u/71048167?v=4" width="100px;" alt=""/><br /><sub><b>Lucas Gonzaga</b></sub></a> | <img src="https://avatars.githubusercontent.com/u/74150316?v=4" width="100px;" alt=""/><br /><sub><b>Ronaldo Rodrigues</b></sub></a> | <img src="https://avatars.githubusercontent.com/u/51674137?v=4" width="100px;" alt=""/><br /><sub><b>Izabelle Tais</b></sub></a> |
| <img src="https://avatars.githubusercontent.com/u/66442236?v=4" width="100px;" alt=""/><br /><sub><b>Julyanne Correia</b></sub></a> | <img src="https://avatars.githubusercontent.com/u/77673388?v=4" width="100px;" alt=""/><br /><sub><b>Gabriel Santos</b></sub></a> | <img src="https://avatars.githubusercontent.com/u/55095158?v=4" width="100px;" alt=""/><br /><sub><b>Sebastian Vieira</b></sub></a> |
|<img src="https://avatars.githubusercontent.com/u/62736535?v=4" width="100px;" alt=""/><br /><sub><b>João Victor Carvalho</b></sub></a>| <img src="https://avatars.githubusercontent.com/u/78103837?v=4" width="100px;" alt=""/><br /><sub><b>Gustavo Henrique</b></sub></a> | <img src="https://avatars.githubusercontent.com/u/70660098?v=4" width="100px;" alt=""/><br /><sub><b>Marcos José</b></sub></a> |
| <img src="https://avatars.githubusercontent.com/u/61056733?v=4" width="100px;" alt=""/><br /><sub><b>Fedra Brito</b></sub></a> | <img src="https://avatars.githubusercontent.com/u/84993974?v=4" width="100px;" alt=""/><br /><sub><b>Everton Souza</b></sub></a> | <img src="https://avatars.githubusercontent.com/u/85748927?v=4" width="100px;" alt=""/><br /><sub><b>Igor</b></sub></a> |
| <img src="https://avatars.githubusercontent.com/u/26782009?v=4" width="100px;" alt=""/><br /><sub><b>Steffano Pereira</b></sub></a> | <img src="https://avatars.githubusercontent.com/u/63360211?v=4" width="100px;" alt=""/><br /><sub><b>Vicente Alencar</b></sub></a> | <img src="https://avatars.githubusercontent.com/u/110693905?v=4" width="100px;" alt=""/><br /><sub><b>Gustavo da Silva</b></sub></a> |
| <img src="https://avatars.githubusercontent.com/u/70300685?v=4" width="100px;" alt=""/><br /><sub><b>Joyce Mirelle</b></sub></a> |         -           | <img src="https://avatars.githubusercontent.com/u/13567601?v=4" width="100px;" alt=""/><br /><sub><b>Caio Nogueira</b></sub></a> |
