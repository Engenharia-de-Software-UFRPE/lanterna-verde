import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";

const Notify = ({ note }) => {
    
    if(note){
        note.has_been_seen = true;
    }

    return ( <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        >
    <div className='ms-2 me-auto'>
        <div className="fw-bold">{note.title}</div>
        </div>
    </ListGroup.Item>
    );
}

export default Notify;