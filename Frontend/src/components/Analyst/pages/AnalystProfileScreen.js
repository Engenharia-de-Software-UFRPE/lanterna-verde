import React from 'react';
import '../../../App.css';
import AnalystProfileContainer from '../analystScreen/AnalystProfileContainer';
import NavbarAnalyst from '../navbar/NavbarAnalyst';


function AnalystProfileScreen() {
  return (
    <>
      <NavbarAnalyst/>
      <AnalystProfileContainer/>
    </>
  );
}

export default AnalystProfileScreen;