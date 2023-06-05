# React CRUD // Admin Panel

Front-end CRUD completo React para sistemas de administração em geral. Ele foi desenvolvido para o conteúdo da [Master Class #014](https://youtube.com/live/mXHkDD9PRM0) da [Dev Samurai](https://devsamurai.com.br).

## Como funciona

## Como executar

## Passo a passo

1. [x] Criar o projeto e instalar o Material UI
2. [ ] Estrutura de base do CRUD

### Passo 1: Criar o projeto e instalar o Material UI

Para criarmos o projeto iremos utilizar o [Vite](https://vitejs.dev/), que é um bundler extremamente rápido e simples de utilizar. Para instalar o Vite, execute o seguinte comando:

```sh
npm create vite@latest react-crud-admin -- --template react-ts
```

Depois do projeto criado, entre na pasta do projeto e instale o [Material UI](https://mui.com/material-ui/getting-started/installation/):

```sh
cd react-crud-admin
npm install @mui/material @emotion/react @emotion/styled @fontsource/roboto @mui/icons-material
```

Criar o arquivo [`src/theme.ts`](./src/theme.ts):

```ts
import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    mode: "dark", // ou "light" de acordo com a sua preferência.
  },
})
```

E ajustar o arquivo [`src/main.tsx`](./src/main.tsx):

```tsx
import { Box, Container } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import React from "react"
import ReactDOM from "react-dom/client"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import { theme } from "./theme.ts"

import App from "./App.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <App />
        </Box>
      </Container>
    </ThemeProvider>
  </React.StrictMode>
)
```

Nisso já não precisaremos mais dos arquivos e podemos excluí-los:

- `src/App.css`
- `src/index.css`
- `src/assets/logo.svg`
- `src/public/vite.svg`

Ajustar o `title` e remover `favicon` do [`index.html`](./index.html):

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React CRUD // Admin Panel</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

E para que possamos testar se o Material UI está funcionando, vamos adicionar um componente de botão no arquivo [`src/App.tsx`](./src/App.tsx):

```tsx
import { Button } from "@mui/material"

export default function App() {
  return (
    <div>
      <Button variant="contained">Hello World</Button>
    </div>
  )
}
```

E pronto! Já temos algo minimamente funcional:

![Hello World](./docs/hello-world.png)
