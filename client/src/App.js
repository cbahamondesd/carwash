import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import NotFound from "./components/NotFound/NotFound";
import InicioSesion from "./pages/Cliente/InicioSesion";
import CheckOut from "./pages/Ordenes/CheckOut/Checkout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/login" element={<InicioSesion/>}></Route>
          <Route path="/checkout" element={<CheckOut/>}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// <Route path="/pets/:id/edit" element={<EditPage></EditPage>}></Route>
