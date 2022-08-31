import React from 'react';
import {useState} from 'react';
import './company-analyzes-filters-section.css'

const CompanyAnalyzesFiltersSection = () =>{
    return(
      <div className="company-analyzes-filter-section-container">
            <h2 className='section-title'>Filtros</h2>

            <div className='filter'>
                <label className='filter-name'>Análises Passíveis de Reanálise</label>
                <input className='filter-checkbox' type="checkbox"></input>
            </div>
      </div>

    );
}

export default CompanyAnalyzesFiltersSection;