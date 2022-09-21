import React from 'react';
import '../../App.css';
import ContainerAdm from '../AdminScreen/ContainerAdm';
import NavbarAdm from '../AdminScreen/NavbarAdm';

function Administrador() {
  return (
    <>
      <NavbarAdm />
      <ContainerAdm />
    </>
  );
}

export default Administrador;