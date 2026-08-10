# 🏠 Landing Page Imobiliária

Landing page desenvolvida para um corretor de imóveis, com foco na apresentação profissional, divulgação de empreendimentos e geração de leads.

O projeto utiliza **Next.js**, **React** e **TypeScript**, com interface responsiva e integração com uma API própria para gerenciamento de depoimentos de clientes.

## 🚀 Funcionalidades

* 🏢 Apresentação do corretor e seus serviços
* 🏠 Exibição de empreendimentos imobiliários
* 📱 Interface responsiva para diferentes dispositivos
* ⭐ Exibição de depoimentos de clientes
* 🔗 Geração de links individuais para coleta de depoimentos
* 🔐 Chaves de acesso únicas com controle de utilização
* ⚙️ Painel administrativo para geração de novos links
* 🔄 Integração entre frontend, API e banco de dados

## 🛠️ Tecnologias

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **HTML5**
* **CSS**

### Backend e Banco de Dados

* **Node.js**
* **API REST**
* **MongoDB**

### Ferramentas

* **Git**
* **GitHub**
* **pnpm**
* **v0**

## 🔗 Arquitetura

O sistema realiza a comunicação entre a interface, a API e o banco de dados:

```text
Landing Page / Painel Administrativo
              │
              ▼
           API REST
              │
              ▼
           MongoDB
              │
       ┌──────┴──────┐
       ▼             ▼
Chaves únicas   Depoimentos
```

O corretor possui acesso a um painel administrativo onde pode gerar novos links de depoimento.

Cada link recebe uma **chave única**, armazenada no MongoDB. Após o cliente acessar o link e enviar seu depoimento, a chave é invalidada, impedindo sua reutilização.

## 💡 Principais aprendizados

Durante o desenvolvimento, foram aplicados conhecimentos de:

* Desenvolvimento de aplicações web
* Desenvolvimento e integração de APIs REST
* Comunicação entre frontend e backend
* Persistência de dados com MongoDB
* Criação de regras de negócio
* Geração e validação de chaves únicas
* Controle de utilização de links
* Desenvolvimento de painel administrativo
* Desenvolvimento de interfaces responsivas

## ⚙️ Como executar

### Pré-requisitos

* Node.js
* pnpm

### Instalação

Clone o repositório:

```bash
git clone https://github.com/SEU-USUARIO/v0-imobiliaria-landing-page.git
```

Entre na pasta:

```bash
cd v0-imobiliaria-landing-page
```

Instale as dependências:

```bash
pnpm install
```

Execute o servidor de desenvolvimento:

```bash
pnpm dev
```

A aplicação estará disponível em:

```text
http://localhost:3000
```

## 📌 Status

**Concluído e em evolução.**
