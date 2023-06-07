import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import { IconButton, Stack } from "@mui/material"
import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "usehooks-ts"

import DataTable from "../../../components/DataTable"

import { User } from "../types/User"

export default function Grid() {
  const [users, setUsers] = useLocalStorage<User[]>("users", [])
  const navigate = useNavigate()

  const onCall = (params: GridRenderCellParams) => {
    if (!params.row.mobile) return

    window.location.href = `https://wa.me/55${params.row.mobile.replace(
      /[^\d]+/g,
      ""
    )}`
  }

  const onEdit = (params: GridRenderCellParams) => {
    if (!params.row.id) return
    navigate(`/users/${params.row.id}`)
  }

  const onDelete = (params: GridRenderCellParams) => {
    if (!params.row.id) return
    setUsers(users.filter((user) => user.id !== params.row.id))
  }

  const columns: GridColDef<User>[] = [
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
        `${
          new Date().getFullYear() -
          new Date(params.row.birthDate).getFullYear()
        }`,
    },
    { field: "email", headerName: "E-mail", minWidth: 200 },
    { field: "mobile", headerName: "Celular", minWidth: 180 },
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

  return <DataTable columns={columns} rows={users as User[]} />
}
