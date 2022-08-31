import React from 'react';
import './main-screen-center-section.css'

const MainScreenCenterSection = () =>{
    return(
        <>
        <section class="center-section">

            <div class="greenwashing">
              <h2 class="contract-services-title">Deseja assinar pacote de avaliações de  greenwashing ?</h2>

              <a class="contract-services" href="#">Contratar Serviços</a>
            </div>
            
            <div class="ranking">
              
              <h2 class="table-title">Ranking</h2>

              <table class="table">
                
                <thead class="table-header"> 
                  <tr>
                    <th class="number">#</th>
                    <th>Nome da Empresa</th>
                    <th>Score</th>
                  </tr>
                </thead>
                
                <tbody class="table-body">
                  <tr>
                    <td class="number">1</td>
                    <td>Empresa 1</td>
                    <td>9,7</td>
                  </tr>
                  <tr>
                    <td class="number">2</td>
                    <td>Empresa 2</td>
                    <td>9,5</td>
                  </tr>
                  <tr>
                    <td class="number">3</td>
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

export default MainScreenCenterSection;