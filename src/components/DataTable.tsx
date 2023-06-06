import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid"

interface DataTableProps {
  columns: GridColDef[]
  rows: GridValidRowModel[]
}

export default function DataTable({ columns, rows }: DataTableProps) {
  return (
    <div style={{ maxHeight: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 15, 25, 50, 100]}
        disableRowSelectionOnClick
      />
    </div>
  )
}
