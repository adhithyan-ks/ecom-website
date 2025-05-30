import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import { UserProvider } from "./context/user.context";
import All from "./pages/AllProducts";
import AddProduct from "./pages/AddProductPage";
import UpdateProduct from "./pages/UpdateProductPage";
import ProductPage from "./pages/ProductPage";
import AdminAllProductsPage from "./pages/AdminAllProductsPage";
import CartPage from "./pages/CartPage";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
        <Route path="/sign-in" element={<SignInPage />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/products" element={<All />}></Route>
        <Route path="/product/:id" element={<ProductPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/admin/all-products" element={<AdminAllProductsPage />}></Route>
        <Route path="/admin/add-product" element={<AddProduct />}></Route>
        <Route path="/admin/edit/product/:id" element={<UpdateProduct />}></Route>
      </Routes>
    </UserProvider>
    
  )
}
export default App;