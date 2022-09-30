import React from "react";
import './CompanyList.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";

const Report = ({report}) =>{
    return (
        <> 
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                >
            <div className='ms-2 me-auto'>
                <div className="fw-bold">
                    Relatório: {report}
                    <button class='btn'>Visualizar</button>
                </div>
            </div>
            </ListGroup.Item>
        </>
    );

}

export default Report;