import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Mesa from "./components/Mesa";
import Header from "./components/Header";
import Mozo from "./components/Mozo";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mesa />} />
          <Route path="/mozos" element={<Mozo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
