import './AnalysisDetail.css'
import axios from 'axios';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import solicita_a_analise from './SolAnalise';
import SolAnalise from './SolAnalise'
import SolAnaliseMap from './SolAnaliseMap'

function SolicitaAnaliseDetail(){

    const [analistas, setAnalistas] = useState(false);

    const setNumAnalistas = async (number) => {
        const response = await axios
        .post(
          'http://localhost:8000/solicitacoesAnalise/add',
          { number: number}
        )
        .then((response) => response)
        .catch(function (error) {
          if(error.response){
            console.log(analistas.response.data);
            setAnalistas(true);
          }
        });
      };


    return(
        <>
        <div className='containerSolAnalise'>
             
             <div className="fw-bold">Empresa: {solicita_a_analise.empresa}</div>
             <div className="fw-bold">ID: {solicita_a_analise.id}</div>
             <Popup trigger={<a href="#">Aceitar Análise</a>}>

                <form action="http://localhost:8000/solicitacoesAnalise/detail" method='post'>
                    <Popup trigger={<a href="" className="closebtn"><strong>Fechar</strong></a>}/>
                    <Popup trigger={<input type="submit" defaultValue="Submit Now" className="submitbtn"/>}/>
                
                    <div className="input-field">
                        <input type="number" placeholder="Informe a quantidade de analistas" className="number" name = 'number'/>
                        <i className="bx bx-hide show-hide" />
                    </div>
                </form>
             </Popup>
        </div>
        </>
    )
}
export default SolicitaAnaliseDetail;