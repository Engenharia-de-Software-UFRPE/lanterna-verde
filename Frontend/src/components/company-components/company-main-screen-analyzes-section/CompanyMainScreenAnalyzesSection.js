import React, { useEffect, useState } from 'react';
import { getAllAnalyzes } from '../../../requests/CompanyRequests';
import './company-main-screen-analyzes-section.css';
import CompanyAnalysis from '../company-analyzes/CompanyAnalysis'
import '../company-analyzes/company-analyzes.css'

const CompanyMainScreenAnalyzesSection = () =>{
    const [analysis, setAnalysis] = useState([]);
    const [reports, setReports] = useState([]);
    const [hasAnalyzes, setHasAnalyzes] = useState(true)
    
    useEffect(() => {
        getAnalyzes()
    },[])

    const getAnalyzes = async () => {
        await getAllAnalyzes()
        .then(response => {
            if(response.status == 200){
                let data = response.data
                let recentAnalyzes = []
                let recentReports =[]

                if(data.Analises.length >=2){
                    recentAnalyzes = data.Analises.slice(0,2)
                    recentReports = data.Relatorios.slice(0,2)
                    
                }else if(data.Analises.length === 1){
                    recentAnalyzes.push(data.Analises[0])
                    recentReports.push(data.Relatorios[0])

                }else setHasAnalyzes(false)

                setAnalysis(recentAnalyzes)
                setReports(recentReports)
            }
        })
    }

    const getDate = (date) => {
        return new Date(date).toLocaleDateString()
    }

    return(
        <>
            <section className="company-main-screen-left-section">
                <h2 className="section-title">Análises Recentes</h2>

                {!hasAnalyzes ? (<h3 className='about-analyzes'>Esta empresa não possui análises</h3>):<></> }

                {reports.map((reportsData, index) => (
                    <CompanyAnalysis analysisDate={getDate(analysis[index].update_date)} analysisId={analysis[index].id}
                    analysisScore={reportsData.ascore} previousAnalysisScore={index===(reports.length-1) ? 0 : reports[index+1].ascore} />
                ))}
                
                <a className="see-all-analysis" href="/CompanyMainScreen/Analyzes">Ver todas as análises</a>
            </section>
        </>
    );
}

export default CompanyMainScreenAnalyzesSection;