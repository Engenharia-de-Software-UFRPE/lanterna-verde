import React from 'react'
import Noticia from './Noticia';

const Noticias =({noticias}) => {
    return(
        <>
            {noticias.map((noticia) => (
                <Noticia noticia={noticia} />
            ))

            }
        </>
    );
} 

export default Noticias;