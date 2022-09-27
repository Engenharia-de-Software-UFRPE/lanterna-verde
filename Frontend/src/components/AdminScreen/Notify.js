import React from "react";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import axios from 'axios';
import './Notification.css';

const Notify = ({ note }) => {
    const navigate = useNavigate();

    async function sendNotificationsRead(notificacaoAdmId){
        let response = await axios.post(
        "http://localhost:8000/notificacoes/read", 
        { notificacaoAdmId: notificacaoAdmId, withCredentials: true }
        )
        .then(response => response);
    }
    
    return ( <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        >
        <div className='ms-0'>
            <div className="fw-bold" onClick={(e) => {
                                        e.preventDefault();
                                        sendNotificationsRead(note.id);
                                        //navigate("FirstCard"); //It's not working since it's not a proper screen
                                    }}>{note.title}</div>
        </div>
        </ListGroup.Item>
    );
    
}

export default Notify;