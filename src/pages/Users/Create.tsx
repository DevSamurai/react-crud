import { Paper, Stack } from "@mui/material"

import Breadcrumbs from "../../components/Breadcrumbs"
import PageTitle from "../../components/PageTitle"

import Form from "./components/Form"

export default function Create() {
  return (
    <>
      <Stack sx={{ marginBottom: 2 }}>
        <PageTitle title="Criar Novo Usuário" />
        <Breadcrumbs
          path={[{ label: "Usuários", to: "/users/" }, { label: "Novo" }]}
        />
      </Stack>
      <Paper>
        <Form />
      </Paper>
    </>
  )
}
