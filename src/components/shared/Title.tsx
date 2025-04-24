import Typography from "@mui/material/Typography"
import { ReactNode } from "react"

interface TitleProps {
  children: ReactNode
}

const Title = ({ children }: TitleProps) => {
  return <Typography variant="h4">{children}</Typography>
}

export default Title
