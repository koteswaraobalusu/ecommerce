import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "../pages/Login/Login"
import Profile from "../pages/Profile/Profile"
import Register from "../pages/Register/Register"
import ProtectedRoute from "./ProtectedRoute"
import Home from "../pages/Home/Home"


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <Login />}/>
        <Route path="/register" element={ <Register /> }/>
        <Route path="/" element={ <Home /> }/>
        <Route element={ <ProtectedRoute /> }>
            <Route path="/profile" element={ <Profile /> }/>
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
