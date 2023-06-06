import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import { IconButton, Stack } from "@mui/material"
import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid"

import DataTable from "../../components/DataTable"

export default function List() {
  const onCall = (params: GridRenderCellParams) => {
    const currentRow = params.row
    return console.log(JSON.stringify(currentRow, null, 4))
  }

  const onEdit = (params: GridRenderCellParams) => {
    const currentRow = params.row
    return console.log(JSON.stringify(currentRow, null, 4))
  }

  const onDelete = (params: GridRenderCellParams) => {
    const currentRow = params.row
    return console.log(JSON.stringify(currentRow, null, 4))
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
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
    { field: "role", headerName: "Perfil", minWidth: 80 },
    {
      field: "actions",
      headerName: "Ações",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={2}>
          <IconButton
            color="success"
            size="small"
            onClick={() => onCall(params)}
          >
            <WhatsAppIcon fontSize="inherit" />
          </IconButton>

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

  return <DataTable columns={columns} rows={rows} />
}
