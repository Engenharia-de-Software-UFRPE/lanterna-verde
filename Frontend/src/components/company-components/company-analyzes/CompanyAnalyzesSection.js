import React, { useEffect, useState } from 'react';
import './company-analyzes.css'
import axios from 'axios';
import CompanyAnalysis from './CompanyAnalysis'

const CompanyAnalyzes = () =>{
    const [analyzes, setAnalyzes] = useState([]);
    const [reports, setReports] = useState([]);
    const [filterSelected, setFilterSelected] = useState(false);

    useEffect(() => {
        getAnalyzes()
    },[])

    const getAnalyzes = async () => {
        await axios.get('http://localhost:8000/empresa/analises', { withCredentials: true })
        .then(res => {
            setAnalyzes(res.data['Analises'])
            setReports(res.data['Relatorios'])
        })
    }

    const getAnalyzesNotReanalyzed = async () => {
        await axios.get('http://localhost:8000/empresa/analises/not-reanalyzed', { withCredentials: true })
        .then(res => {
            setAnalyzes(res.data['Analises'])
            setReports(res.data['Relatorios'])
        })

    }

    const getDate = (date) => {
        return new Date(date).toLocaleDateString()
    }

    const handleClickCheckbox = () =>{
        if(!filterSelected){
            setFilterSelected(true)
            setReports([])
            getAnalyzesNotReanalyzed()
        }else {
            setFilterSelected(false)
            setReports([])
            getAnalyzes()
        }        
    }

    return(
        <>
            <section className="company-analyzes-filter-section">
                <h2 className='section-title'>Filtros</h2>

                <div className='filter'>
                    <label className='filter-name'>Análises Passíveis de Reanálise</label>
                    <input className='filter-checkbox' type="checkbox" onClick={handleClickCheckbox} on></input>
                </div>
            </section>

            <section className="company-analyzes-section">

                <h2 className='section-title'>Análises</h2>

                <div className='analyzes-container'>
                    {reports.map((reportsData, index) => (
                        <CompanyAnalysis analysisDate={getDate(reports[index].date)} 
                        analysisId={reports[index].id}
                        analysisScore={reportsData.ascore} 
                        previousAnalysisScore={index===(reports.length-1) ? 0 : reports[index+1].ascore} 
                        analyzesScreen={true}
                        analysisStatus = {reports[index].status}
                        />
                        
                    ))}
                </div>                
            </section>
        </>

    );
}

export default CompanyAnalyzes;
