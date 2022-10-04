import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import CompanyHeader from '../company-components/company-header/CompanyHeader';
import CompanyAnalysisDetails from '../company-components/company-analyzes/CompanyAnalysisDetails';
import axios from "axios";



function CompanyAnalyzesScreen() {

  const location = useLocation();
  const idAnaly = location.state.analysisId;
  const [analysis,setAnalysis] = useState("placeholder");

  async function loadData(id) {
    let response = await axios
    .get("http://localhost:8000/relatorio/detail?reportid="+id, { withCredentials: true})
    .then()
    setAnalysis(response)
  
    
  }

  if (analysis === "placeholder"){
    loadData(idAnaly) 
  }
  else {
    console.log(analysis)
    return (
      <>
        <header>
            <CompanyHeader/> 
        </header>
        
        <CompanyAnalysisDetails analysisDetail ={analysis.data.relatorio.request.analises}/>
        
      </>
    )
  }


  
}

export default CompanyAnalyzesScreen