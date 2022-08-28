import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationScreen from './pages/RegistrationScreen';
import MainScreen from './pages/MainScreen';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route path='/Registration' element={<RegistrationScreen />} />
            <Route path='/' element={<MainScreen />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
