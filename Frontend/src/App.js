import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Administrador from './components/pages/Administrador';

import Home from './components/pages/Home';

import Cadastro from './components/pages/AnalystRegistration';
import TelaPerfilAnalista from './components/pages/AnalystProfileScreen';
import DadosAnalista from './components/pages/DataAnalyst';

import CompanyMainScreen from './components/pages/CompanyMainScreen';
import CompanyRegistrationScreen from './components/pages/CompanyRegistrationScreen';
import CompanyServicesScreen from './components/pages/CompanyServicesScreen';
import CompanyAnalyzesScreen from './components/pages/CompanyAnalyzesScreen';
import CompanyPerformanceScreen from './components/pages/CompanyPerformanceScreen';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path= '/Admin' element={<Administrador />} />

          {/******************************Analyst****************************/}
          <Route path='telaPerfilAnalista' element={<TelaPerfilAnalista />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="dadosAnalista" element={<DadosAnalista />} />

          {/******************************Company****************************/}
          <Route path='/CompanyMainScreen' element={<CompanyMainScreen />} />
          <Route path='/CompanyRegistration' element={<CompanyRegistrationScreen />} />
          <Route path='/CompanyMainScreen/Services' element={<CompanyServicesScreen />} />
          <Route path='/CompanyMainScreen/Analyzes' element={<CompanyAnalyzesScreen />} />
          <Route path='/CompanyMainScreen/Performance' element={<CompanyPerformanceScreen />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;