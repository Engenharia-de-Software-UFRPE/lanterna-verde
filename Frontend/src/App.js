import React from 'react';
import './App.css';
// import Cadastro from './components/pages/AnalystRegistration';
import Home from './components/pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import TelaPerfilAnalista from './components/pages/AnalystProfileScreen';
// import DadosAnalista from './components/pages/DataAnalyst';
import CompanyMainScreen from './components/pages/CompanyMainScreen';
import CompanyRegistrationScreen from './components/pages/CompanyRegistrationScreen';
import CompanyServicesScreen from './components/pages/CompanyServicesScreen';
import Administrador from './components/pages/Administrador';


//Analyst
import AnalystProfileScreen from './components/Analyst/pages/AnalystProfileScreen';
import DataAnalyst from './components/Analyst/pages/DataAnalyst';
import AnalysisScreen from './components/Analyst/pages/AnalysisScreen';
import DataAnalystEdit from './components/Analyst/pages/DataAnalystEdit';
import AnalystRegistration from './components/Analyst/pages/AnalystRegistration';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path= '/Admin' element={<Administrador />} />

          {/******************************Analyst****************************/}
          <Route path='/' element={<Home />} />
          <Route path='analystProfile' element={<AnalystProfileScreen />} />
          <Route path="analystRegistration" element={<AnalystRegistration />} />
          <Route path="dataAnalyst" element={<DataAnalyst />} />
          <Route path="dataAnalystEdit" element={<DataAnalystEdit />} />
          <Route path='analysisScreen' element ={<AnalysisScreen/>} />
          {/******************************Company****************************/}
          <Route path='/CompanyMainScreen' element={<CompanyMainScreen />} />
          <Route path='/CompanyRegistration' element={<CompanyRegistrationScreen />} />
          <Route path='/CompanyMainScreen/Services' element={<CompanyServicesScreen />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;