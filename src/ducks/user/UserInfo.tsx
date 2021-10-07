import React from 'react';
import EmployeeName from "./EmployeeName";
import EmployeePlSummary from "./EmployeePLSummary";
import EmployeeEntry from "./EmployeeEntry";
import EmployeePayPeriodSummary from "./EmployeePayPeriodSummary";

const UserInfo: React.FC = () => {
    return (
        <div className="tc__user-info">
            <EmployeeName/>
            <EmployeeEntry/>
            <EmployeePayPeriodSummary/>
            <EmployeePlSummary/>
        </div>
    );
}

export default UserInfo;
