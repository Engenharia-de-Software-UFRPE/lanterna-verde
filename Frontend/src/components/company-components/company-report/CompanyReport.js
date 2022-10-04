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
            const array = []
            const formatDate = (date) => {
                return new Date(date).toLocaleDateString()
            }

            const scores = [(res.data['Scores']['Ascore']),
                        (res.data['Scores']['D1']),
                        (res.data['Scores']['D2']),
                        (res.data['Scores']['D3']),
                        (res.data['Scores']['D4'])]
            const labelsLineGraph = []
            const dataLineGraph = []
            if (res.data['ScorePorData'].length >0){
                for (let i = ((res.data['ScorePorData'].length)-1);i >= 0 ; i--){
                    labelsLineGraph.push(formatDate(res.data['ScorePorData'][i]['data']))
                    dataLineGraph.push(res.data['ScorePorData'][i]['ascore'])
                    console.log(res.data['ScorePorData'][i])
                }
            }

            setLineGraphData({
                labels: labelsLineGraph,
                datasets:[{
                    label:'Grafico de linha',
                    data:dataLineGraph,

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

            })
            .catch( error=>{
                alert("Erro")
            })
    };

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