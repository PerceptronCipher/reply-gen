import React, { useState } from "react";

import "./App.css";
import Navbar from "./Pages/Navbar";
import Main from "./Pages/Main";
import Paste from "./Pages/Paste";
import Features from "./Pages/Features";
import How from "./Pages/How";
import Footer from "./Pages/Footer";
function App() {

  const [uploaded, setUploaded] = useState(false);

  const handleUploadClick = () => {
    setUploaded(true); // this tells Paste to prefill textarea
  };
  return (
    <div className='App'>
      <div className='main1'>
        <Navbar onUploadClick={handleUploadClick} />
        <Main /> 
        <Features />
        <Paste uploaded={uploaded} />
        <How />
      </div>
      <Footer />
    </div>
  )
}

export default App;
