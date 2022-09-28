import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import Popup from 'reactjs-popup';
import axios from 'axios';
import './SolAnalise.css';

const SolAnalise = ({solicita_a_analise}) =>{

    const [active, setActive] = useState(false);
    const[analystAm, setAnalystAm] = useState({
        analystamount: ''
    });
    
    const{analystamount} = analystAm;

    const setAnalystAmount = ({target}) => {
        setAnalystAm({
            ...analystAm,
            [target.name]:target.value
        });
    };
    
    const setNumAnalistas = async(analystamount, analysis_request) => {
        const response = await axios.post(
            'http://localhost:8000/analise/add',
            {'analystamount': analystamount})
        .then(response => response);
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
                    Empresa: {solicita_a_analise.empresa.tradeName}
                    <button onClick={detailsHandler} class='btn'> Abrir análise</button>
                </div>
            </div>
            </ListGroup.Item>
            {active ? 
                <div className='containerSolAnalise'>
                
                    <div className="fw-bold">Corporação: {solicita_a_analise.empresa.corporateName}</div>
                    <div className="fw-bold">ID: {solicita_a_analise.empresa.id}</div>
                    <Popup trigger={<a href="#">Aceitar Análise</a>}>

                    <form>
                        
                        <div className="input-field">
                            <input type="number" placeholder="Quantidade de analistas" className="number" name = 'analystamount' onChange={setAnalystAmount} value = {analystamount}/>
                            <i className="bx bx-hide show-hide" />
                        </div>
                        <input type="submit" defaultValue="Submit Now" className="submitbtn" onClick={(e) => {
                            e.preventDefault();
                            setNumAnalistas(analystAm.analystamount, solicita_a_analise.id);
                        }}/>
                    </form>
                    </Popup>
                </div>
            : ''}
        </>
    );
};
export default SolAnalise;