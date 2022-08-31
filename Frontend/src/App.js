import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationScreen from './pages/RegistrationScreen';
import MainScreen from './pages/MainScreen';
import ServicesScreen from './pages/ServicesScreen';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route path='/' element={<MainScreen />} />
            <Route path='/Registration' element={<RegistrationScreen />} />
            <Route path='/Services' element={<ServicesScreen />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
