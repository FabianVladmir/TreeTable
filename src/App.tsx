
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ExampleComponent from './TablaPrueba';
import TableTest from './TestTable';
import CentroCostosComponent from './VerifaCentrosCostos';
import RelacionCentroCostos from './CentroCostos';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/example">Example Component (Contiene la tabla principal) </Link>
            </li>
            <li>
              <Link to="/table-test">Table Test (Contiene la tabla que debe aplicar todas las funcionalidades) </Link>
            </li>
            <li>
              <Link to="/centro-costos">Centro de Costos (Contiene la relacion entre centros de costos y nombre de cuentas) </Link>
            </li>

            <li>
              <Link to="/cuenta-costos">Centro de Costos (Contiene la relacion entre centros de costos y nombre de cuentas) </Link>
            </li>
            
          </ul>
        </nav>

        <Routes>
          <Route path="/example" element={<ExampleComponent />} />
          <Route path="/table-test" element={<TableTest />} />
          <Route path="/centro-costos" element={<CentroCostosComponent />} />
          <Route path="/cuenta-costos" element={<RelacionCentroCostos />} />
         
          <Route path="/" element={<h1>Bienvenido a la aplicación</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
