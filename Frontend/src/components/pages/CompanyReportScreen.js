import { useState } from "react";
import LineChart from "../company-components/company-report/LineChart";
import { UserData } from "../company-components/company-report/Data";
import CompanyBasicHeader from '../company-components/company-basic-header/CompanyBasicHeader';
import '../company-components/company-report/CompanyReport.css'

function CompanyReportScreen() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Dimensão 1",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "Dimensão 2",
        data: UserData.map((data) => data.userLost),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      }
    ],
  });

  // IF YOU SEE THIS COMMENT: I HAVE GOOD EYESIGHT

  return (
    
    
    <div className="Container-ReportScreen">
       <header>
         <CompanyBasicHeader/>
      </header>
      <div className="Container-Report">
        <div className="Container-Report-Inside">
          <div className="Report-Title">Histórico</div>
          <div className="Container-Graph" >
            <LineChart chartData={userData} />
          </div>
          <div className="Report-Tips">Recomendações</div>


        </div>
        
      </div>      
    </div>

  );
}

export default CompanyReportScreen;