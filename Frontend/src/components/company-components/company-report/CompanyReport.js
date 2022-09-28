import React, { useEffect, useState } from "react";
import './CompanyReport.css'
import { Chart as ChartJS } from "chart.js/auto";
import { Line, Radar } from "react-chartjs-2";
import axios from 'axios';


function CompanyReportScreen() {

    const [lineGraphData, setLineGraphData] = useState({
        labels: [],
        datasets: [{
            label: "",
            data: [],
        }],
    });

    const [radarGraphData, setRadarGraphData] = useState({
        labels: [],
        datasets: [
        {
            label: "",
            data: [],
        }],
    });

    useEffect(() => (
        getReport()
    ), [])

    const getReport = async () => {
        await axios.get('http://localhost:8000/empresa/report', { withCredentials: true })
        .then(res => {
            let data = res.data;
            console.log(data)
            getData()
        })
        .catch( error=>{
            alert("Erro")
        })
    };

    const getData = () => {
        
        console.log(lineGraphData)
        console.log(lineGraphData['labels'])
        console.log(lineGraphData['datasets'][0])
        console.log(lineGraphData['datasets'][0]['label'])
        console.log(lineGraphData['datasets'][0]['data'])
        
        
        const array = [10,10,10,10,10]

        setLineGraphData({
            labels:[0,0,2,1,0],
            datasets:[{
                label:'Grafico de linha',
                data:array,

                backgroundColor: "rgba(27, 181, 92, 0.5)",
                borderColor: "rgba(27, 181, 92, 0.4)",
  
            }]
        })

        setRadarGraphData({
            labels:['ASCORE','D1', 'D2', 'D3', 'D4'],
            datasets:[{
                label:'Radar',
                data: array,

                backgroundColor: "rgba(27, 181, 92, 0.4)",
                borderColor: "rgba(27, 181, 92, 0.4)",
            }]
        })
    }

  return (
    
    
    <div className="Container-ReportScreen">

        <div className="Container-Report">

            <div className="Container-Report-Inside">
                <h2 className="Report-Title">Score ao longo do tempo</h2>
                <div className="graphs">
                
                    <div className="Container-Graph" >
                        <Line data={lineGraphData} />
                    </div>

                    <div className="Container-Graph" >
                        <Radar data={radarGraphData} />
                    </div>
                    
                    <div className="Report-Tips">
                        <p>Recomendações: </p>
                    </div>

                </div>
            </div>
        </div>
    </div>

  );
}

export default CompanyReportScreen;