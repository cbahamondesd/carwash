import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import NotFound from "./components/NotFound/NotFound";
import InicioSesion from "./pages/Funcionarios/InicioSesion";
import CierreSesion from "./pages/Funcionarios/CierreSesion";
import RegistroFuncionario from "./pages/Funcionarios/RegistroFuncionario";
import RegistroOrden from "./pages/Ordenes/RegistroOrden";
import CheckOut from "./pages/Ordenes/CheckOut/Checkout";
import ListadoServicios from "./pages/Servicios/ListadoServicios";
import ListadoOrdenes from "./pages/Ordenes/ListadoOrdenes";
import ListadoClientes from "./pages/Cliente/ListadoClientes";
import EditarCliente from "./pages/Cliente/EditarCliente";
import RegistroCliente from "./pages/Cliente/RegistroCliente";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/login" element={<InicioSesion/>}></Route>
          <Route path="/logout" element={<CierreSesion/>}></Route>
          <Route path="/register" element={<RegistroFuncionario />}></Route>
          <Route path="/registro-orden" element={<RegistroOrden/>}></Route>
          <Route path="/checkout" element={<CheckOut/>}></Route>
          <Route path="/servicios" element={<ListadoServicios/>}></Route>
          <Route path="/ordenes" element={<ListadoOrdenes/>}></Route>
          <Route path="/clientes" element={<ListadoClientes/>}></Route>
          <Route path="/clientes/edit/:id" element={<EditarCliente/>}></Route>
          <Route path="/clientes/registro" element={<RegistroCliente/>}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
