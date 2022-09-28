import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";


const CompanyAnalysis = ({analises_da_empresa}) =>{

    return ( <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                >
            <div className='ms-2 me-auto'>
                <div className="fw-bold">Análise: {analises_da_empresa.listar_analises_empresa}</div>
                </div>
            </ListGroup.Item>
    );
};
export default CompanyAnalysis;