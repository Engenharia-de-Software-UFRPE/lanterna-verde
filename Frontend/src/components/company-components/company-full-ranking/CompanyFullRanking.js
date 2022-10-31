import React, { useEffect, useState } from 'react';
import './company-full-ranking.css'
import { getCompaniesRanking } from '../../../requests/CompanyRequests';
const CompanyFullRanking = () =>{
    const [ranking, setRanking] = useState([])
    const [top3, setTop3] = useState([])

    useEffect( () => {
        getRanking()
    }, []);

    const getRanking = async () => {
        getCompaniesRanking()
        .then(response =>{
            if(response.status == 200){
                let data = response.data.Empresas
                setRanking(data)
                setTop3(data)
                if(data.length >3) setTop3(data.slice(0, 3))  
            }
        })

    }

    return (
        <>
            <section className='ranking-section'>
                <div className='ranking-container'>

                    <h2 className='top3-title'>Top 3</h2>
                    <div className='top3'>
                        {top3.map((companyData, index) => (
                            <div className='company'>
                                <h3 className={'tradename'}>{companyData.tradeName}</h3>
                                <h4 className='cnpj'><strong>CNPJ: </strong>{companyData.cnpj}</h4>
                                <h4 className='type'><strong>Tipo: </strong>{companyData.tipo}</h4>
                                <h4 className='score'><strong>Score: </strong>{companyData.score}</h4>
                            </div>
                        ))}
                    </div>

                    <h2 className='ranking-title'>Ranking</h2>
                    <div className='ranking'>
                        <table class="table">
                            <thead class="table-header"> 
                            <tr>
                                <th>Rank</th>
                                <th>Nome da Empresa</th>
                                <th>Score</th>
                            </tr>
                            </thead>
                            
                            <tbody class="table-body">
                                {ranking.map((companyData, index) => (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{companyData.tradeName}</td>
                                        <td>{companyData.score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            
        </>
    )
} 

export default CompanyFullRanking;