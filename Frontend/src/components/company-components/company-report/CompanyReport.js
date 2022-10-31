import React, { useEffect, useState } from "react";
import './CompanyReport.css'
import { Chart as ChartJS } from "chart.js/auto";
import { Line, Radar } from "react-chartjs-2";
import { getReportInfo } from "../../../requests/CompanyRequests";


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
        await getReportInfo()
        .then(response => {
            if(response.status == 200){
                let data = response.data;
                const formatDate = (date) => {
                    return new Date(date).toLocaleDateString()
                }

                const scores = [
                    (data.Scores.Ascore),
                    (data.Scores.D1),
                    (data.Scores.D2),
                    (data.Scores.D3),
                    (data.Scores.D4)
                ]
                
                const labelsLineGraph = data.ScorePorData.map(scoreData => formatDate(scoreData.data))
                const dataLineGraph = data.ScorePorData.map(scoreData => scoreData.ascore)

                setLineGraphData({
                    labels: labelsLineGraph,
                    datasets:[{
                        label:'Grafico de linha',
                        data:dataLineGraph.reverse(),

                        backgroundColor: "rgba(27, 181, 92, 0.4)",
                        borderColor: "rgba(27, 181, 92, 0.4)",    
                    }]
                })
                setRadarGraphData({
                    labels:['ASCORE','D1', 'D2', 'D3', 'D4'],
                    datasets:[{
                        label:'Radar',
                        data: scores,

                        backgroundColor: "rgba(27, 181, 92, 0.4)",
                        borderColor: "rgba(27, 181, 92, 0.4)",
                    }]
                })
            }
        })
    }

  return (
    
    
    <div className="Container-ReportScreen">

        <div className="Container-Report">

            <h2 className="Report-Title">Score ao longo do tempo</h2>

            <div className="container-graphs-tips"> 
                <div className="graphs">
                    <div className="Container-Graph" >
                        <Line data={lineGraphData} />
                    </div>

                    <div className="Container-Graph" >
                        <Radar data={radarGraphData} />
                    </div>
                </div>

                <div className="Report-Tips">
                    <h3 className="tips-title">Dicas</h3>
                    <div className="tips">
                        <h4 className="tip"><strong>Dica D1: </strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
                        <h4 className="tip"><strong>Dica D2: </strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
                        <h4 className="tip"><strong>Dica D3: </strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </h4>
                        <h4 className="tip"><strong>Dica D4: </strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
                    </div>
                </div>

                
            </div>
        </div>
    </div>

  );
}

export default CompanyReportScreen;