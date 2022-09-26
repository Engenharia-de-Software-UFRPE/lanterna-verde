import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import SolicitaAnaliseDetail from './AnalysisDetail';

const SolAnalise = ({solicita_a_analise}) =>{

    const [active, setActive] = useState(false);

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
                    ID da Empresa: {solicita_a_analise.company}
                    <button onClick={detailsHandler} class='btn'> Abrir análise</button>
                </div>
            </div>
            </ListGroup.Item>
            {active ? <SolicitaAnaliseDetail/> : ''}
        </>
    );
};
export default SolAnalise;