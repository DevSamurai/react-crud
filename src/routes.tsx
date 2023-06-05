import { Route, Routes } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Users from "./pages/Users"
import UserCreate from "./pages/Users/Create"
import UserList from "./pages/Users/List"

// import NotFound from "./pages/NotFound"

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<Users />}>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserCreate />} />
        {/* <Route path=":id" element={<User />}></Route> */}
      </Route>
    </Routes>
  )
}
