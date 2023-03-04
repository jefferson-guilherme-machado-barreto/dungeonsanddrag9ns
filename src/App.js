import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Home } from './pages/Home'
import { AddItem } from "./pages/AddItem"

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/addItem" element={<AddItem/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
