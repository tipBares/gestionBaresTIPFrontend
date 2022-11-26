import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Mesa from "./components/Mesa";
import Header from "./components/Header";
import Mozo from "./components/Mozo";
import ProductoLista from "./components/Producto";
import FormProducto from "./components/FormProducto/";
import FormMozo from "./components/FormMozo/FormMozo";
import Categoria from "./components/Categoria";
import FormCategoria from "./components/FormCategoria";
import HistorialTickets from "./components/HistorialTickets";
import FormTicket from "./components/FormTicket";

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
          <Route path="/productos" element={<ProductoLista />} />
          <Route path="/agregarProducto" element={<FormProducto />} />
          <Route path="/editarProducto/:id" element={<FormProducto />} />
          <Route path="/categorias" element={<Categoria />} />
          <Route path="/agregarCategoria" element={<FormCategoria />} />
          <Route path="/editarCategoria/:id" element={<FormCategoria />} />
          <Route path="/historialTickets" element={<HistorialTickets />} />
          <Route path="/abrirTicket" element={<FormTicket />} />
          <Route path="/abrirTicket/:id" element={<FormTicket />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
