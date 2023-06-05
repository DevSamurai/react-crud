import { Typography } from "@mui/material"

interface FormTitleProps {
  title: string
}

export default function FormTitle({ title }: FormTitleProps) {
  return (
    <Typography color="text.primary" variant="h6" sx={{ marginBottom: 2 }}>
      {title}
    </Typography>
  )
}
