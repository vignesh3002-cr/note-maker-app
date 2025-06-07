import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import AuthPage from "./components/AuthPage";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/app" element={<App />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

