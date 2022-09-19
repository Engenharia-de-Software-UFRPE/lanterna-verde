import React from 'react';
import '../../../App.css';
import NavbarAnalyst from '../navbar/NavbarAnalyst';
import AnalysisForm from '../analysis/MakeAnalysis';
import {useLocation} from 'react-router-dom';


function AnalysisScreen() {
  const location = useLocation();
  console.log(location.state.analise);
  return (
    <>
      <NavbarAnalyst />
      <AnalysisForm analise ={location.state.analise}/>
      
    </>
  );
}

export default AnalysisScreen