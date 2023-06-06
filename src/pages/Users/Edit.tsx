import { Paper, Stack } from "@mui/material"
import { useParams } from "react-router-dom"

import Breadcrumbs from "../../components/Breadcrumbs"
import PageTitle from "../../components/PageTitle"

import Form from "./components/Form"

export default function Edit() {
  const { id } = useParams()

  return (
    <>
      <Stack sx={{ marginBottom: 2 }}>
        <PageTitle title={`Editar Usuário ${id}`} />
        <Breadcrumbs
          path={[{ label: "Usuários", to: "/users/" }, { label: "Editar" }]}
        />
      </Stack>
      <Paper>
        <Form />
      </Paper>
    </>
  )
}
