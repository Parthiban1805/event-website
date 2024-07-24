import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RegistrationPage from "./components/registration/registration";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
