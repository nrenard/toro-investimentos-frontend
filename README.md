# Este é um teste técnico para Toro

## Architecture

- React
- React Router Dom
- Jest
- React Testing Library
- Axios
- Typescript
- Styled Components
- Husky
- Lint Staged

### <strong>Árvore do código fonte:</strong>

```
  src
  |-- __mocks__
  |-- __tests__
  |-- @types
  |-- assets
  |-- components
  |-- containers
  |-- helpers
  |-- containers
  |-- pages
  |-- routes
  |-- services
  |-- styles
  |-- App.tsx
  |-- index.tsx
```

<br/>

## Instalação ambiente de desenvolvimento

Requisitos para rodar o projeto nodeJS >= 14. Clonar repositório, entrar na pasta e instalar suas dependências com o comando `yarn` ou `npm install` e copiar o arquivo `.env.example` para `.env.development` configurando as variáveis de acordo com o ambiente.

<br/>


## Scripts

<details>
  <summary>
    <strong style="font-size: 15px;">Testes</strong>
  </summary>

  <br/>

  <b>Rodar testes</b>

  > `npm test`

  <b>Rodar cobertura de testes</b>

  > `npm run test:ci`
</details>

<br/>

<details>
  <summary>
    <strong style="font-size: 15px;">Rodar código</strong>
  </summary>

  <br/>

  <b>Rodar servidor</b>

  <p>*** Antes rodar script de build ***</p>

  > `npm run start`

  <b>Buildar código</b>

  > `npm run build`
</details>