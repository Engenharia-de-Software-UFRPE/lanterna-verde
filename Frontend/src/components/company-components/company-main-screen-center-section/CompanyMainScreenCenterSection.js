import React from 'react';
import './company-main-screen-center-section.css';

const CompanyMainScreenCenterSection = () =>{
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
                  <tr>
                    <td>1º</td>
                    <td>Empresa 1</td>
                    <td>9,7</td>
                  </tr>
                  <tr>
                    <td>2º</td>
                    <td>Empresa 2</td>
                    <td>9,5</td>
                  </tr>
                  <tr>
                    <td>3º</td>
                    <td>Empresa 3</td>
                    <td>9,0</td>
                  </tr>
                </tbody>

              </table>

              <a class="see-full-ranking" href="#">Ver Ranking Completo</a>

            </div>

          </section>
        </>
    );
}

export default CompanyMainScreenCenterSection;