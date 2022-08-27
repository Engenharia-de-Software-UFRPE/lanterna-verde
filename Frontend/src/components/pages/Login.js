import React from 'react';
import '../../App.css';
import NavbarHome from '../HomeScreen/NavbarHome';
import PopupLogin from '../HomeScreen/PopupLogin';

function Login() {
  return (
    <>
      <NavbarHome />
      <PopupLogin />
    </>
  );
}

export default Login;