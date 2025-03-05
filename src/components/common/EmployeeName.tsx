import React from 'react';
import {useSelector} from 'react-redux';
import {selectEmployee} from "@/ducks/user";

const EmployeeName = () => {
    const employee = useSelector(selectEmployee);
    if (!employee) {
        return null;
    }
    const {FirstName, LastName} = employee;
    return (
        <h3>{FirstName} {LastName}</h3>
    );
}

export default EmployeeName;
