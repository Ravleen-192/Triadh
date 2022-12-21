import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigate from './components/nav-bar/Navbar';
import Footer from './components/footer/Footer';
import Home from './components/pages/Home';


import Services from './components/pages/Services';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import WhitePaper from './components/pages/WhitePaper';

import Theia from './components/pages/Theia';
import Helios from './components/pages/Helios';
import Plutus from './components/pages/Plutus';
import './css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <>
      <Router>
        
          
          <Routes>
           
                <Route exact path="/" element={<><Navigate /><Home /></>} />

                <Route exact path="/services" element={<><Navigate /><Services /></>} />
                <Route exact path="/company" element={<><Navigate /><Company /></>} />
                <Route exact path="/contact" element={<><Navigate /><Contact /></>} />
                <Route exact path="/plutus" element={<><Navigate /><Plutus /></>} />
                <Route exact path="/helios" element={<><Navigate /><Helios /></>} />
                <Route exact path="/theia" element={<><Navigate /><Theia /></>} />
                <Route exact path="/whitepaper" element={<WhitePaper />} />
            
          </Routes>
          <Footer />
       
      </Router>
    </>
  );
}

export default App;
