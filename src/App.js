import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Navbar from "./components/Navbar/Navbar";
import Indexpage from "./pages/Indexpage/Indexpage";
import Form from "./components/Form/Form";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Indexpage />} />
            <Route path="/auth" element={<Form />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
