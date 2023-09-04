import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Create from './pages/Create';
import Error from './pages/Error';
import Card from 'react-bootstrap/Card';



function App() {
  return (
    <div className="app">
      <div className="app-container">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="create" element={<Create />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
