import {useSelector} from 'react-redux';
import TimeDisplay from "./TimeDisplay.tsx";
import classNames from 'classnames';
import {selectEmployee} from "@/ducks/user";
import {Accordion} from "react-bootstrap";

export default function EmployeePlSummary({eventKey}: { eventKey: string }) {
    const employee = useSelector(selectEmployee);
    if (!employee) {
        return null;
    }

    const {CarryOverHours, HoursAccrued, HoursAvailable, HoursUsed} = employee;
    return (
        <Accordion.Item eventKey={eventKey}>
            <Accordion.Header>Personal Leave Summary</Accordion.Header>
            <Accordion.Body>
                <table className="table table-hover">
                    <tbody>
                    <tr>
                        <th>Carry Over</th>
                        <td className="right"><TimeDisplay hours={CarryOverHours}/></td>
                    </tr>
                    <tr>
                        <th>Accrued</th>
                        <td className="right"><TimeDisplay hours={HoursAccrued}/></td>
                    </tr>
                    <tr>
                        <th>Used</th>
                        <td className="right"><TimeDisplay hours={HoursUsed}/></td>
                    </tr>
                    <tr className={classNames({'table-danger': HoursAvailable >= 195 || HoursAvailable < 8})}>
                        <th>Available</th>
                        <td className="right"><TimeDisplay hours={HoursAvailable}/></td>
                    </tr>
                    </tbody>
                </table>
            </Accordion.Body>
        </Accordion.Item>
    );
}
