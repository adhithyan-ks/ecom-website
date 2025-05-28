import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import { UserProvider } from "./context/user.context";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
        <Route path="/sign-in" element={<SignInPage />}></Route>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </UserProvider>
    
  )
}
export default App;