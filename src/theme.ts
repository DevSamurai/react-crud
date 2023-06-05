import { ptBR as MaterialLocale } from "@mui/material/locale"
import { createTheme } from "@mui/material/styles"
import { ptBR as DataGridLocale } from "@mui/x-data-grid"

export const theme = createTheme(
  {
    palette: {
      mode: "dark",
    },
  },
  DataGridLocale,
  MaterialLocale
)
