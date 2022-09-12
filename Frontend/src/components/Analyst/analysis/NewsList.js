import React from 'react'
import News from './News';

const NewsList =({noticias}) => {
    return(
        <>
            {noticias.map((news) => (
                <News news={news} />
            ))

            }
        </>
    );
} 

export default NewsList;