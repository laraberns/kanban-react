# Desafio Técnico: Aplicativo de Kanban com ReactJS e NodeJS

Este repositório contém o código-fonte para um aplicativo simples de Kanban, desenvolvido com ReactJS para o frontend e Node.js para o backend. O objetivo é permitir que os usuários gerenciem tarefas através das três colunas: "To Do", "Doing" e "Ready".

## Frontend (React)

### Glossário

- 🔲 Atividade a ser elaborada.
- ✅ Atividade feita.
- ⚠️ Atividade feita com observações.

### Interface do Usuário:

Desenvolvi uma interface simples e intuitiva para o aplicativo Kanban, que inclui as seguintes funcionalidades:

- ✅ **Três Colunas:** "To Do", "Doing" e "Ready", para organizar suas tarefas.
- ✅ **Adição, Movimentação e Remoção:** Os usuários podem adicionar novas tarefas, movê-las entre as colunas e removê-las conforme necessário.
- ✅ **Detalhes da Tarefa:** As tarefas possuem nome e data de conclusão.
- ✅ **Filtros e Ordenação:** Implementei funcionalidades de filtro e ordenação para facilitar o gerenciamento das tarefas.
- ✅ **Pesquisa por Texto (Opcional):** Adicionei a capacidade de pesquisar tarefas por texto, tornando a experiência mais personalizada.

### Tecnologias e Práticas:

- ✅ **ReactJS:** Utilizei o React para o desenvolvimento da interface, aproveitando sua eficiência e reatividade.
- ✅ **Ciclo de Vida e Gerenciamento de Estado:** Aplicei conceitos do ciclo de vida do React e gerenciamento de estado para uma experiência de usuário suave e eficiente.
- ⚠️ **Bootstrap React (Opcional):** Ofereci a opção de utilizar o Bootstrap React para acelerar o desenvolvimento, mantendo a estética moderna e responsiva. 
***Foi utilizado Tailwind no projeto em vez de Bootstrap

### Construção:
- React Beautiful DnD: Utilizei a biblioteca React Beautiful DnD para facilitar a implementação de arrastar e soltar, proporcionando uma interação intuitiva com as tarefas.
- Styled-Components: Utilizei a biblioteca Styled-Components, que permite escrever CSS em JS enquanto constrói componentes personalizados no React, proporcionando uma estilização modular e reutilizável.

### Features Adicionais:
- Editar os nomes das tarefas criadas.
  
## Como Executar o Projeto:

1. Clone este repositório: `git clone https://github.com/laraberns/kanban-react.git`
2. Instale as dependências: `npm install`
3. Inicie o frontend: `npm start`

Agora, você pode acessar o aplicativo Kanban em [http://localhost:3000](http://localhost:3001) e interagir com suas tarefas.

Sinta-se à vontade para explorar, contribuir e aprimorar este projeto!