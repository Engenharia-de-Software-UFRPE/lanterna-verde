import React, {useState, useEffect} from 'react';
import './company-main-screen-center-section.css';
import { getCompaniesRanking } from '../../../requests/CompanyRequests';

const CompanyMainScreenCenterSection = () =>{
  const [ranking, setRanking] = useState([])

  useEffect( () => {
    getRanking()
  }, []);

  const getRanking = async () => {
    await getCompaniesRanking()
    .then(response => {
      if(response.status == 200){
        let data = response.data.Empresas
        setRanking(data.length > 3 ? data.slice(0, 3) : data)
      }
    })
  }

    return(
        <>
        <section class="company-main-screen-center-section">

            <div class="greenwashing">
              <h2 class="contract-services-title">Deseja assinar pacote de avaliações de  greenwashing ?</h2>

              <a class="contract-services" href="/CompanyMainScreen/Services">Contratar Serviços</a>
            </div>
            
            <div class="ranking">
              
              <h2 class="table-title">Ranking</h2>

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

              <a class="see-full-ranking" href="/CompanyMainScreen/Ranking">Ver Ranking Completo</a>

            </div>

          </section>
        </>
    );
}

export default CompanyMainScreenCenterSection;