import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Create from './pages/Create';
import Error from './pages/Error';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="create" element={<Create />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
