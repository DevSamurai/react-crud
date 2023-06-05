import { BrowserRouter } from "react-router-dom"

import { AppRoutes } from "./routes"

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
