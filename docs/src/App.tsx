import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MainLayout } from "@/layouts/main";

import { HomePage } from "@/pages/home";

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/pydi-framework/" element={<HomePage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
