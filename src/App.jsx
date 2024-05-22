import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Index";
import Registrar from "./Pages/Registrar/index";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Logout from "./Pages/Logout/Logout";
import Grafico from "./components/grafico/Grafico";
import Relatorio from "./Pages/Relatorio/Relatorio";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/relatorio" element={<Relatorio />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/grafico" element={<Grafico />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
