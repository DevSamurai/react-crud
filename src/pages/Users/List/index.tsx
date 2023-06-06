import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"
import { Box, Button, IconButton, Paper, Stack } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid"
import Breadcrumbs from "../../../components/Breadcrumbs"
import DataTable from "../../../components/DataTable"
import PageTitle from "../../../components/PageTitle"

export default function List() {
  const onEdit = (params: GridRenderCellParams) => {
    const currentRow = params.row
    return console.log(JSON.stringify(currentRow, null, 4))
  }

  const onDelete = (params: GridRenderCellParams) => {
    const currentRow = params.row
    return console.log(JSON.stringify(currentRow, null, 4))
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 40 },
    {
      field: "firstName",
      headerName: "Nome",
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.fullName.split(" ")?.shift() || ""}`,
    },
    {
      field: "lastName",
      headerName: "Sobrenome",
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.fullName.split(" ")?.pop() || ""}`,
    },
    { field: "document", headerName: "CPF", width: 150 },
    {
      field: "age",
      headerName: "Idade",
      type: "number",
      valueGetter: (params: GridValueGetterParams) =>
        params.row.birthDate &&
        `${new Date().getFullYear() - params.row.birthDate.getFullYear()}`,
    },
    { field: "email", headerName: "E-mail", minWidth: 200 },
    { field: "mobile", headerName: "Celular", minWidth: 180 },
    { field: "status", headerName: "Status", minWidth: 80 },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={2}>
          <IconButton color="info" size="small" onClick={() => onEdit(params)}>
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => onDelete(params)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ]

  const rows = [
    {
      id: 1,
      fullName: "Felipe Fontoura",
      document: "99988811100",
      birthDate: new Date(1982, 2, 18),
      email: "someemail@gmail.com",
      mobile: "+5512982049999",
      status: "ACTIVE",
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
