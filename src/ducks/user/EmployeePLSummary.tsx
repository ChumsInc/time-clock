import React from 'react';
import {useSelector} from 'react-redux';
import Time from "./Time";
import classNames from 'classnames';
import {selectEmployee} from "./index";

const EmployeePlSummary: React.FC = () => {
    const employee = useSelector(selectEmployee);
    if (!employee) {
        return null;
    }

    const {CarryOverHours, HoursAccrued, HoursAvailable, HoursUsed} = employee;
    return (
        <div className="tc__user-info--section">
            <h5>Personal Leave Summary</h5>
            <table className="table table-hover">
                <tbody>
                <tr>
                    <th>Carry Over</th>
                    <td className="right"><Time hours={CarryOverHours}/></td>
                </tr>
                <tr>
                    <th>Accrued</th>
                    <td className="right"><Time hours={HoursAccrued}/></td>
                </tr>
                <tr>
                    <th>Used</th>
                    <td className="right"><Time hours={HoursUsed}/></td>
                </tr>
                <tr className={classNames({'table-danger': HoursAvailable >= 195 || HoursAvailable < 8})}>
                    <th>Available</th>
                    <td className="right"><Time hours={HoursAvailable}/></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default EmployeePlSummary;
