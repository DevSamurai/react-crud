import { Route, Routes } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import UserCreate from "./pages/Users/Create"
import UserEdit from "./pages/Users/Edit"
import UserList from "./pages/Users/List"

// import NotFound from "./pages/NotFound"

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users">
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserCreate />} />
        <Route path="/users/:id" element={<UserEdit />} />
      </Route>
    </Routes>
  )
}
