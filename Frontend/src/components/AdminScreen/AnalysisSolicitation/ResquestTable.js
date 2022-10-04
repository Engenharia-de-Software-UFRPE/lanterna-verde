import React from 'react';
import '../AdmContainer/ContainerAdm.css';
import SolAnaliseMap from './SolAnaliseMap';

const ResquestTable = ({solAnalise}) => {

    return (<div id="requestListArea">
        <h6 class="requestList"><strong>Solicitações de Análise</strong></h6>
        <div id="table-wrapper">
            <div id="table-scroll">
                <table>
                    <tbody> 
                    <SolAnaliseMap solicitacoes_analise ={solAnalise}/>
                    </tbody>
                </table>
            </div>
        </div>
    </div >
    )
}
export default ResquestTable;