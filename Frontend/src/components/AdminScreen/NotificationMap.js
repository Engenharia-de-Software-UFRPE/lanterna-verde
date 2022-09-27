import React from 'react';
import Notify from './Notify';

const NotificationMap = ({ noteAdm}) => {
    
    return(
        <div className='listNotifications'>
            {noteAdm.map((note) => (<Notify note={note} />))}
        </div>
    );
}

export default NotificationMap;