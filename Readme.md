# Bem vindos ao repositório desáfio_NG_CASH

<details>
<summary><strong>👨‍💻 O que foi desenvolvido</strong></summary><br />
    Foi desenvolvido uma aplicação onde a pessoa usuária pode ser capaz de criar uma conta, logar colocando os dados cadastrados e através do login, receber um token jwt para validar algumas regras de negócio. Cada nova conta cadastrada, devereceber um saldo de R$ 100. Após o usuário logado, ele deve poder consultar ao seu saldo, realizar transações entre pessoas cadastradas e vizualizar essas transações feitas e/ou recebidas, também podendo filtrar pela data que foi realizada.

    Toda a aplicação foi desenvolvida em typescript, seguindo os pilares da programação orientada à objeto e utilizado a arquitetura MSC, composta pelas camadas Model, Service e Controller. Todas as rotas do backend foram tratadas e validadas conforme as regras de negócio.
</details>

<strong>
   Em breve irei atualizar o frontend conforme abaixo:
</strong>

## Backend
    - [x] rota de login (/login) 
    - [x] rota de cadastro de usuario (/register) 
    - [x] rota de consultar próprio saldo (/balance) 
    - [x] rota de cash-out (/transfer)
    - [x] rota de transactions (/transactions)

## Frontend
    - [ ] Criar tela de login (username e password)
    - [ ] Criar tela de cadastro (username e password)
    - [ ] Componente de seção voltada à realização de transferências para outros usuários, contendo campo de username destino e valor;
    - [ ] Componente de Tabela com os detalhes de todas as transações que o usuário participou, tendo Mecanismo para filtrar a tabela por data de transação e/ou transações do tipo cash-in/cash-out;
    - [ ] Botão para realizar o log-out.
    - [ ] Pagina principal contendo os componentes acima e campo de 'balance' (saldo)

<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:
 - Node 
 - Docker
 - Docker-compose versão >=1.29.2
</details>

<details>
<summary><strong>Como ter acesso ao projeto e instalar as dependências</strong></summary><br />

    1. Entre na pasta do repositório que você acabou de clonar ou fazer o download do arquivo zip:
    * `cd pasta-do-repositório`

    2. Instale as dependências:
    *`npm install`

    3. Suba os imagens do servidor node e do banco de do docker-compose com o comando:
    *`docker-compose up -d`

    4. Após subir o container, roda as migrations com o comando:
    *`npm run db:reset`

    5. Por fim acesse o bash da imagem do node e deixe o aplicação rodando na porta 3001 com o comando abaixo, mas lembre-se de verificar se não existe outro processo rodando na mesma porta:
    *`npm run dev` 
</details>
