import React, { useState, useEffect } from 'react';
import axios from "axios";

// class AnalysisForm extends React.Component {
    const CompanyAnalysisDetails = ({analysisId}) => {

        function testButtonHandler() {
          console.log(analysisDetail)
        }
        const [analysisDetail,setAnalysisDetail] = useState(["placeholder"]);

        async function getList() {
            let response = await axios
              .get("http://localhost:8000/relatorio/detail?reportid="+analysisId, { withCredentials: true})
              .then((response) => response);
            console.log(response)
            setAnalysisDetail(response.data.request.analises);
        

          }
        
          if (analysisDetail[0] === "placeholder") {
            getList();
          }

      
        return (
          <div>
                <div className='coluna'>
                <h1>Analise:</h1>
                <button onClick={testButtonHandler}>teste</button>
                </div>
                


          </div>
        );
      }
      
      export default CompanyAnalysisDetails;