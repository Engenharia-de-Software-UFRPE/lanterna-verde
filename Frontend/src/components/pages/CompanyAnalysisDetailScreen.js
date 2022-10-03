import React from 'react';
import {useLocation} from 'react-router-dom';
import CompanyHeader from '../company-components/company-header/CompanyHeader';
import CompanyAnalysisDetails from '../company-components/company-analyzes/CompanyAnalysisDetails';
function CompanyAnalyzesScreen() {
  const location = useLocation();
  console.log(location.state.analysisId);
  return (
    <>
      <header>
          <CompanyHeader/> 
      </header>
      <CompanyAnalysisDetails analysisId ={location.state.analysisId}/>
      
    </>
  );
}

export default CompanyAnalyzesScreen