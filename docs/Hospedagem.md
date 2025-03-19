# Instruções de Uso, Configuração e Deploy

Esta seção fornece orientações detalhadas para configurar e executar a aplicação localmente, abrangendo tanto o backend quanto o frontend. Siga os passos abaixo para garantir que todos os componentes estejam funcionando corretamente.

## 1. Banco de Dados

### 1.1. Configuração e Execução do Script SQL

#### 1. **Instale o MySQL:**  

Certifique-se de que o MySQL (ou MariaDB) esteja instalado e em execução na sua máquina.

#### 2. **Criação do Banco de Dados:**  

Abra o terminal e acesse o MySQL: 

```bash
mysql -u root -p
```

Em seguida, crie o banco de dados:

```sql
CREATE DATABASE case_stage;
```

#### 3. **Execução do Script SQL:**

No terminal, execute o script SQL que contém a estrutura das tabelas:

```bash
mysql -u root -p case_stage < ./database/db.sql
```

Esse comando criará as tabelas _area_, _process_, _organizational_unit_ e _responsible_ conforme definido no script. Em seguida, ele irá popular a database com alguns dados iniciais.

#### 4. **Configuração da Conexão:**

No backend, as variáveis de ambiente devem ser configuradas em um arquivo **.env** na raiz dele conforme abaixo:

```env
PORT=3000
DATABASE_URL="mysql://root:root@localhost:3306/case_stage"
```

## 2. Executando o Backend

O backend é uma aplicação Node.js escrita em TypeScript. As configurações estão definidas no package.json do projeto.

### 2.1. Scripts Disponíveis

- **dev:** Executa a aplicação em modo de desenvolvimento com nodemon.  
- **build:** Compila o código TypeScript para JavaScript.  
- **start:** Inicia a aplicação a partir dos arquivos compilados.  
- **test:** Executa os testes com cobertura utilizando o Jest.

### 2.2. Passos para Rodar o Backend Localmente

**Instalar Dependências:**  
Navegue até a pasta do backend (por exemplo, `case-stage-server`) e execute:

```bash
cd case-stage-server
npm install
```

**Configurar Variáveis de Ambiente:**  
Crie um arquivo **.env** na raiz do projeto com o seguinte conteúdo:

```env
PORT=3000
DATABASE_URL="mysql://root:root@localhost:3306/case_stage"
```

**Executar em Modo de Desenvolvimento:**  
Execute o comando:

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

**Build e Start (para produção):**  
Para compilar e iniciar a aplicação:

```bash
npm run build
npm start
```

## 3. Executando o Frontend

O frontend é uma aplicação React configurada com Vite. As configurações básicas e as variáveis de ambiente estão definidas no package.json do cliente.

### 3.1. Passos para Rodar o Frontend Localmente

**Instalar Dependências:**  
Navegue até a pasta do frontend (por exemplo, `case-stage-client`) e execute:

```bash
cd case-stage-client
npm install
```

**Configurar Variáveis de Ambiente:**  
Crie um arquivo **.env** na raiz do projeto com a seguinte variável:

```env
VITE_API_BASE_URL=http://localhost:3000
```

**Executar em Modo de Desenvolvimento:**  
Execute o comando:

```bash
npm run dev
```

A aplicação deverá ser acessada via navegador (a URL geralmente será exibida no terminal, por exemplo, [http://localhost:5173](http://localhost:5173)).

**Build e Preview (para produção):**  
Para construir e visualizar a versão de produção:

```bash
npm run build
npm run preview
```

## Deploy:

Para deploy em ambientes de produção, ajuste as configurações de conexão do banco de dados e as variáveis de ambiente de acordo com o provedor de hospedagem utilizado.

Seguindo estas instruções, você conseguirá configurar e executar tanto o backend quanto o frontend da aplicação localmente, garantindo que todos os componentes do sistema funcionem de forma integrada.
