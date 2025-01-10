import React from "react";
import { Routes, Route } from "react-router-dom";
import CardContact from "./components/CardContact";
import injectContext from "./store/appContext";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CardContact />} />
      <Route path="/editContact/:id" element={<CardContact />} />
    </Routes>
  );
};

export default injectContext(App);
