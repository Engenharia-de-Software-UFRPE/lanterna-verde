import React, { useReducer } from 'react';
import { authReducer, LOGIN } from './reducers/authReducer';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';
import './App.css';
import Home from './components/pages/Home';
import Administrador from './components/pages/Administrador';
//Company
import CompanyMainScreen from './components/pages/CompanyMainScreen';
import CompanyRegistrationScreen from './components/pages/CompanyRegistrationScreen';
import CompanyServicesScreen from './components/pages/CompanyServicesScreen';
//Analyst
import AnalystProfileScreen from './components/Analyst/pages/AnalystProfileScreen';
import DataAnalyst from './components/Analyst/pages/DataAnalyst';
import AnalysisScreen from './components/Analyst/pages/AnalysisScreen';
import DataAnalystEdit from './components/Analyst/pages/DataAnalystEdit';
//import AnalystRegistration from './components/Analyst/pages/AnalystRegistration';


function App() {
  const navigate = useNavigate();
  const [data, dispatch] = useReducer(authReducer, {token: null})
  const loginThunk = async (username, password) => {
    axios.defaults.withCredentials = true;
    const response = await axios
    .post(
      'http://localhost:8000/login',
      { username: username, password: password},{withCredentials:true}
    )
    .then((response) => response);
    dispatch({ type: LOGIN, token: response.data.token })
    console.log(response.data);

    {/*Condicional para troca de tela após realização do Login */}
    if(response.data === 'administrador'){
      navigate('/Admin');
    } else if(response.data === 'analista'){
      navigate('/analystProfile');
    } else if(response.data === 'empresa'){
      navigate('/CompanyMainScreen');
    }
  };

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
          {/* <Route path="analystRegistration" element={<AnalystRegistration />} /> */}
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