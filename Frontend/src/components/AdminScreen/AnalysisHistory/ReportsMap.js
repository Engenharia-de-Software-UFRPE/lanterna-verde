import React from "react";
import Report from './Report';

const ReportsMap =({companyReports}) => {
    return(
        <>
            {companyReports.map((report) => (
                <Report report ={report} />
            ))
            }
        </>
    );
} 
export default ReportsMap;