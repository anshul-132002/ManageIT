import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Create from "./components/Create";
import Read from "./components/Read";
import UpdataUser from "./components/UpdataUser";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/read" element={<Read />} />
        <Route path="/edit/:id" element={<UpdataUser />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
