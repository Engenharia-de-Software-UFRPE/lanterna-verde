import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";

const SolAnalise = ({solicita_a_analise}) =>{

    return ( <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                >
            <div className='ms-2 me-auto'>
                <div className="fw-bold">ID da Empresa: {solicita_a_analise.empresa}</div>
                </div>
            </ListGroup.Item>
    );
};
export default SolAnalise;