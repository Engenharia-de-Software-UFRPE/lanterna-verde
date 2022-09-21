import React, { useState } from "react";
import LineChart from "../company-components/company-report/LineChart";
import { UserData } from "../company-components/company-report/Data";
import CompanyHeader from '../company-components/company-header/CompanyHeader';
import '../company-components/company-report/CompanyReport.css'

function CompanyReportScreen() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Score",
        data: UserData.map((data) => data.score),
        backgroundColor: [
          "rgba(75,192,192,1)",

        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  // IF YOU SEE THIS COMMENT: I HAVE GOOD EYESIGHT

  return (
    
    
    <div className="Container-ReportScreen">
       <header>
         <CompanyHeader/>
      </header>
      <div className="Container-Report">
        <div className="Container-Report-Inside">
          <div className="Report-Title">Histórico</div>
          <div className="Container-Graph" >
            <LineChart chartData={userData} />
          </div>
          <div className="Report-Tips">
            <p>Recomendações: </p>
            </div>


        </div>
        
      </div>      
    </div>

  );
}

export default CompanyReportScreen;