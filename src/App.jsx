import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./webpages/home/Home";
import Video from "./webpages/video/Video";

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  return (
    <>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />} />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
      </Routes>
    </>
  );
};

export default App;