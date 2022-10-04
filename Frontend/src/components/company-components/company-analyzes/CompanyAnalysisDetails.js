import React, { useState, useEffect } from 'react';
import axios from "axios";
import CompanyAnalysisMap from './CompanyAnalysisMap';

// class AnalysisForm extends React.Component {
    const CompanyAnalysisDetails = ({analysisDetail}) => {

        function testButtonHandler() {
          console.log(analysisDetail)
        }
        // const [analysisDetail,setAnalysisDetail] = useState(["placeholder"]);

        // async function getList() {

        

        //   }
        
        //   if (analysisDetail[0] === "placeholder") {
        //     getList();
        //   }

      
        return (
          <div>
                <div className='coluna'>
                <h1>Analise:</h1>
                <button onClick={testButtonHandler}>teste</button>
                </div>
            <CompanyAnalysisMap analises={analysisDetail}/>
                


          </div>
        );
      }
      
      export default CompanyAnalysisDetails;