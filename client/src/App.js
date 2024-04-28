import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage/HomePage";
import NotFound from "./Components/NotFound/NotFound";
import InicioSesion from "./Pages/Cliente/InicioSesion";
//import CierreSesion from "./Pages/Cliente/CierreSesion";
import RegistroCliente from "./Pages/Cliente/RegistroCliente";
import CheckOut from "./Pages/Ordenes/CheckOut/Checkout";
import Api from './Pages/Api';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/api" element={<Api/>}></Route>
          <Route path="/login" element={<InicioSesion/>}></Route>
          <Route path="/register" element={<InicioSesion/>}></Route>
          <Route path="/checkout" element={<CheckOut/>}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// <Route path="/pets/:id/edit" element={<EditPage></EditPage>}></Route>
