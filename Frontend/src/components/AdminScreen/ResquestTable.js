import React, { useState } from 'react';
import './ContainerAdm.css';
import SolAnaliseMap from './SolAnaliseMap';
import axios from 'axios';
import NoteBadge from './Notification';

const Tableadmin = () => {
  
    const [solAnalise,setSolicitaAnalise] = useState(['placeholder']);

    async function solicitaAnalise() {
      let response = await axios.get(
        "http://localhost:8000/solicitacoesAnalise",
        { withCredentials: true }
      )
      .then(response => response)
      setSolicitaAnalise(response.data.solicitacoes_analise)
    }
    
    if (solAnalise[0] === "placeholder") {
        solicitaAnalise();
      }
      
      console.log(solAnalise)
    return (<div id="requestListArea">
        <h6 class="requestList"><strong>Solicitações de Análise</strong></h6>
        <div id="table-wrapper">
            <div id="table-scroll">
                <table>
                    <tbody> 
                    <SolAnaliseMap soliciatoes_analise ={solAnalise} />
                    </tbody>
                </table>
                <NoteBadge></NoteBadge>
            </div>
        </div>
    </div >
    )
}
export default Tableadmin;