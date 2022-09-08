import React, { useReducer } from 'react';
import { authReducer, LOGIN } from './reducers/authReducer';
import './App.css';
// import Cadastro from './components/pages/AnalystRegistration';
import Home from './components/pages/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
//import TelaPerfilAnalista from './components/pages/AnalystProfileScreen';
//import DadosAnalista from './components/pages/DataAnalyst';
import CompanyMainScreen from './components/pages/CompanyMainScreen';
import CompanyRegistrationScreen from './components/pages/CompanyRegistrationScreen';
import CompanyServicesScreen from './components/pages/CompanyServicesScreen';
import Administrador from './components/pages/Administrador';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';


//Analyst
import AnalystProfileScreen from './components/Analyst/pages/AnalystProfileScreen';
import DataAnalyst from './components/Analyst/pages/DataAnalyst';
import AnalysisScreen from './components/Analyst/pages/AnalysisScreen';
import DataAnalystEdit from './components/Analyst/pages/DataAnalystEdit';
import AnalystRegistration from './components/Analyst/pages/AnalystRegistration';


function App() {
  const navigate = useNavigate();
  const [data, dispatch] = useReducer(authReducer, {token: null})
  const loginThunk = async (username, password) => {
    const response = await axios
    .post(
      'http://localhost:8000/login',
      { username: username, password: password}
    )
    .then((response) => response)
    .catch(function (error) {
      if(error.response){
        console.log(error.response.data); 
      }
    });
    console.log(response.data)
    dispatch({ type: LOGIN, token: response.data.token })
    
    {/*Condicional para troca de tela após realização do Login */}
    if(response.data === 'administrador'){
      navigate('/Admin');
    } else if(response.data === 'analista'){
      navigate('/analystProfile');
    } else if(response.data === 'empresa'){
      navigate('/CompanyMainScree');
    } 
  }

  return (
    <AuthContext.Provider value={{
      data,
      loginThunk
    }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path= '/Admin' element={<Administrador />} />

          {/******************************Analyst****************************/}
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
    </AuthContext.Provider>
  );
}

export default App;