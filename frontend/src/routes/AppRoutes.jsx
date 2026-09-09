import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "../pages/Login/Login"
import Profile from "../pages/Profile/Profile"
import Register from "../pages/Register/Register"
import ProtectedRoute from "./ProtectedRoute"
import Home from "../pages/Home/Home"
import Products from "../pages/Products/Products"
import PageNotFound from "../pages/NotFound/PageNotFound"
import ProductDetails from "../pages/Products/ProductDetails"



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
        <Route path="/products" element={ <Products /> }/>
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="*" element={ <PageNotFound /> } />
      </Routes>
    </Router>
  )
}

export default AppRoutes
