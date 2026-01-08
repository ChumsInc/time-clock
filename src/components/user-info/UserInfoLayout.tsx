import EmployeeName from "../common/EmployeeName";
import EmployeePlSummary from "./EmployeePLSummary";
import EmployeeEntry from "./EmployeeEntry";
import EmployeePayPeriodSummary from "./EmployeePayPeriodSummary";
import {Accordion} from "react-bootstrap";

export default function UserInfoLayout() {
    return (
        <div className="tc__user-info mb-3">
            <EmployeeName/>
            <Accordion defaultActiveKey={['latest-entry', 'period-summary', 'pl-summary']} alwaysOpen>
                <EmployeeEntry eventKey="latest-entry"/>
                <EmployeePayPeriodSummary eventKey="period-summary"/>
                <EmployeePlSummary eventKey="pl-summary"/>
            </Accordion>
        </div>
    )
}
