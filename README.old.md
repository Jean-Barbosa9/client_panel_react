# client_panel_react
Projeto usado no curso React Front to Back da Udemy ministrado pelo Brad Traversy.

# Anotações para o que fazer de exercício da última aula:

  - Component Clients:
    - Importar PropTypes;
    - Importar compose;
    - Importar connect;
    - Importar firestoreConnect from 'react-redux-firebase'; 
    - Exportar por padrão compose, passando como parâmetros firestoreConnect (com um array de objetos, tendo collection: clients) e connect (state e props como parâmentros). Aqui no caso firestoreConnect é responsável por trazer os documents das collections que são passadas no array de objetos (que nesse caso, são os clientes) e connect é responsável por trazer esses dados para as propriedades do component
    - Configurar os propTypes;
    - Inserir na div ao lado no título do component, o valor total de balance alinhado à direita e cinza
      - Aqui será necessário inicializar esse valor em state como null e manuseá-lo pelo usando getDerivedStateFromProps
  - Criar component Spinner e importar em Clients
