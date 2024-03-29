import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cards from "./components/Cards";
import Home from "./pages/Home";
import Top from "./pages/Top";
import Bottom from "./pages/Bottom";
import FootWear from "./pages/FootWear";
import Carousel from "./components/Carousel";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<Cards />} />
        <Route path="/top" element={<Top />} />
        <Route path="/bottom" element={<Bottom />} />
        <Route path="/foot" element={<FootWear />} />
        <Route path="/c" element={<Carousel />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
