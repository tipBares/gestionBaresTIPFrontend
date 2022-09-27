import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
//import Buscador from "./components/BuscadorProducto/Buscador";
import Mesa from "./components/Mesa";
import Header from "./components/Header";
import Mozo from "./components/Mozo";
//import ProductoLista from "./components/ProductoLista";
import ProductoLista from "./components/ProductoLista";
import FormProducto from "./components/FormProducto/FormProducto";
import FormMozo from "./components/FormMozo/FormMozo";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mesa />} />
          <Route path="/mozos" element={<Mozo />} />
          <Route path="/productos" element={<ProductoLista />} />
          <Route path="/agregarProducto" element={<FormProducto />} />
          <Route path="/agregarMozo" element={<FormMozo />} />
          <Route path="/editarMozo/:id" element={<FormMozo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
