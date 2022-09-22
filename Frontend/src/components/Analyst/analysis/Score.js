import React, {useState} from 'react';


const Score = ({score}) => {
    let [scr,setScr] = useState(0);
    return(<>
    <button onClick={() => setScr(score)}>Adicionar um valor</button>
    SCOREEE: {scr}<br></br>
    </>)
}; 

export default Score;