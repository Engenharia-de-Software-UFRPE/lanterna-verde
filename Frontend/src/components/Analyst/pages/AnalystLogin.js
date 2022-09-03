import React from 'react';
import '../../../App.css';
import Navbar from '../navbar/Navbar';
import ContainerLogin from '../login/ContainerLogin';
import NavbarHome from '../../HomeScreen/NavbarHome';

function AnalystLogin() {
  return (
    <>
      <NavbarHome />
      <ContainerLogin />
    </>
  );
}

export default AnalystLogin;