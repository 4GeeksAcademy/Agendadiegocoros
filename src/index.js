import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import injectContext from "./store/appContext"; // Importa el contexto

// Crea el contexto envolvente
const AppWithContext = injectContext(App);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWithContext /> {/* Usamos App con el contexto */}
    </BrowserRouter>
  </React.StrictMode>,
);
