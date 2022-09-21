import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import {useNavigate} from 'react-router-dom';
import SolicitaAnaliseDetail from './AnalysisDetail';
import { useState } from 'react';

const SolAnalise = ({solicita_a_analise}) =>{

    const [active, setActive] = useState(false)

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
                ID da Empresa: {solicita_a_analise.empresa}
                <button onClick={detailsHandler} class='btn'> <h5 className='nameAdm'></h5>Abrir análise</button>
                </div>
                </div>
            </ListGroup.Item>
            {active ? <SolicitaAnaliseDetail/> : ''}
        </>
    );
};
export default SolAnalise;