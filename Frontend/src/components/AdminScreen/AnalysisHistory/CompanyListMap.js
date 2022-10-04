import CompanyList from "./CompanyList";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CompanyListMap =({companies_list}) => {
    return(
        <>
            {companies_list.map((list_of_companies) => (
                <CompanyList list_of_companies ={list_of_companies} />
            ))
            }
        </>
    );
} 
export default CompanyListMap;