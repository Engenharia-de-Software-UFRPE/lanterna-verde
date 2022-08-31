import React from 'react';
import './App.css';
import Cadastro from './components/pages/AnalystRegistration';
import Home from './components/pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TelaPerfilAnalista from './components/pages/AnalystProfileScreen';
import DadosAnalista from './components/pages/DataAnalyst';


function App() {
  return (
    <BrowserRouter>
    
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='telaPerfilAnalista' element={<TelaPerfilAnalista />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="dadosAnalista" element={<DadosAnalista />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
