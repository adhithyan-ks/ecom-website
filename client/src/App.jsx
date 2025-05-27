import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  return (
    <UserProvideer>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage/>}></Route>
      </Routes>
    </UserProvideer>
  )
}
export default App;