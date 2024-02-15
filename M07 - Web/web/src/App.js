import './styles.css';
import { Route, Routes} from 'react-router-dom';
import Inici from './routes/Inici';
import Servei from './routes/Servei';
import Sobre from './routes/Sobre';
import Contacte from './routes/Contacte';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Inici />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/servei" element={<Servei />} />
        <Route path="/contacte" element={<Contacte />} />
      </Routes>
      </div>
  );
}