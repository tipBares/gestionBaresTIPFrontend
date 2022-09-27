import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Mesa from "./components/Mesa";
import Header from "./components/Header";
import Mozo from "./components/Mozo";
import FormMozo from "./components/FormMozo/FormMozo";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mesa />} />
          <Route path="/mozos" element={<Mozo />} />
          <Route path="/agregarMozo" element={<FormMozo />} />
          <Route path="/editarMozo/:id" element={<FormMozo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
