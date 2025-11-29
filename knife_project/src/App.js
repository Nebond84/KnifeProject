import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NaviBar } from './Components/Navibar';

import { HomePage } from './Home';
import { AboutPage } from './About';
import { CatalogePage } from './Cataloge';
import { Footer } from './Components/Footer';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <NaviBar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/catalog" element={<CatalogePage />} />
        </Routes>
      </Router >
      <Footer />
    </>
  );
}

export default App;
