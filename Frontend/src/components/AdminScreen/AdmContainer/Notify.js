import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import axios from 'axios';
import './Notification.css';

const Notify = ({ note }) => {
  
    async function sendNotificationsRead(notificacaoAdmId){
        let response = await axios.post(
        "http://localhost:8000/notificacoes/read", 
        { notificacaoAdmId: notificacaoAdmId, withCredentials: true }
        )
        .then(response => response);
    }

    var dh = (new Date(note.date)).toLocaleString();
    return ( <><ListGroup.Item
        as="li"
        className="notif d-flex justify-content-between align-items-start"
        >
        <div className='ms-0'>
            <div className="notes fw-bold" onClick={(e) => {
                                        e.preventDefault();
                                        sendNotificationsRead(note.id);
                                    }}>{note.title}{dh}</div>
        </div>
        </ListGroup.Item>
        </>
    );
    
}

export default Notify;