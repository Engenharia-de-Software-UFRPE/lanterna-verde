import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import Popup from 'reactjs-popup';
import axios from 'axios';
import './SolAnalise.css';

const SolAnalise = ({solicita_a_analise}) =>{

    const [active, setActive] = useState(false);
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

    const detailsHandler = () => {
        setActive((prevState) => !prevState);
    }
  
    return (
        <> 
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                >
            <div className='ms-2 me-auto'>
                <div className="fw-bold">
                    Empresa {solicita_a_analise.empresa.tradeName}
                    <button onClick={detailsHandler} class='btn'> Abrir análise</button>
                </div>
            </div>
            </ListGroup.Item>
            {active ? 
                <div className='containerSolAnalise'>
                
                    <div className="fw-bold">Corporação: {solicita_a_analise.empresa.corporateName}</div>
                    <div className="fw-bold">ID: {solicita_a_analise.empresa.id}</div>
                    <Popup trigger={<a href="#">Aceitar Análise</a>}>

                    <form action="http://localhost:8000/solicitacoesAnalise/detail" method='post'>
                        <Popup trigger={<a href="" className="closebtn"><strong>Fechar</strong></a>}/>
                        <Popup trigger={<input type="submit" defaultValue="Submit Now" className="submitbtn"/>}/>
                    
                        <div className="input-field">
                            <input type="number" placeholder="Quantidade de analistas" className="number" name = 'number'/>
                            <i className="bx bx-hide show-hide" />
                        </div>
                    </form>
                    </Popup>
                </div>
            : ''}
        </>
    );
};
export default SolAnalise;