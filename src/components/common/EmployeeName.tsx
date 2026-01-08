import {useSelector} from 'react-redux';
import {selectEmployee} from "@/ducks/user";

export default function EmployeeName() {
    const employee = useSelector(selectEmployee);
    if (!employee) {
        return null;
    }
    const {FirstName, LastName} = employee;
    return (
        <h3 className="mt-3">{FirstName} {LastName}</h3>
    )
}
