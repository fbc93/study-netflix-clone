import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Search from "./routes/Search";
import TV from "./routes/TV";

function BrowserRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Home />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/tv/:id" element={<TV />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  )
}

export default BrowserRouter;