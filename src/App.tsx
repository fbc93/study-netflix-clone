import { HelmetProvider } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Routes/Components/Navbar";
import Home from "./Routes/Home";
import TV from "./Routes/TV";

function App() {
  return (
    <HelmetProvider>
      <Navbar />
      <Routes>
        <Route path="/tv" element={<TV />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
