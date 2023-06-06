import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"
import { Box, Button, Paper, Stack } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import Breadcrumbs from "../../../components/Breadcrumbs"
import DataTable from "../../../components/DataTable"
import PageTitle from "../../../components/PageTitle"

export default function List() {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "firstName",
      headerName: "Nome",
      width: 130,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.fullName.split(" ")?.shift() || ""}`,
    },
    {
      field: "lastName",
      headerName: "Sobrenome",
      width: 130,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.fullName.split(" ")?.pop() || ""}`,
    },
    { field: "document", headerName: "CPF", width: 150 },
    {
      field: "age",
      headerName: "Idade",
      type: "number",
      width: 40,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.birthDate &&
        `${new Date().getFullYear() - params.row.birthDate.getFullYear()}`,
    },
    { field: "email", headerName: "E-mail", width: 200 },
    { field: "mobile", headerName: "Celular", width: 180 },
  ]

  const rows = [
    {
      id: 1,
      fullName: "Felipe Fontoura",
      document: "99988811100",
      birthDate: new Date(1982, 2, 18),
      email: "someemail@gmail.com",
      mobile: "+5512982049999",
    },
  ]

  return (
    <>
      <Stack direction={{ xs: "column", sm: "row" }} gap={1} mb={2}>
        <Box sx={{ flexGrow: 1 }}>
          <PageTitle title="Lista" />
          <Breadcrumbs
            path={[{ label: "Usuários", to: "/users" }, { label: "Lista" }]}
          />
        </Box>
        <Box sx={{ alignSelf: "center" }}>
          <Button
            component={RouterLink}
            to="/users/new"
            variant="contained"
            startIcon={<PersonAddAltIcon />}
          >
            Novo Usuário
          </Button>
        </Box>
      </Stack>
      <Paper>
        <DataTable columns={columns} rows={rows} />
      </Paper>
    </>
  )
}
