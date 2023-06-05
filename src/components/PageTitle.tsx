import { Typography } from "@mui/material"

interface PageTitleProps {
  title: string
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <Typography color="text.primary" variant="h5">
      {title}
    </Typography>
  )
}
