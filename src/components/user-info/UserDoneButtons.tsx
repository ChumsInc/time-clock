import {clearUser, selectEmployee, selectEmployeePayPeriod, selectUserCode, selectUserLoading} from "@/ducks/user";
import {useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {getUserInfo} from "@/ducks/user/actions";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {ClockButtons} from "@/components/common/ClockButtons";

export default function UserDoneButtons() {
    const dispatch = useAppDispatch();
    const code = useSelector(selectUserCode);
    const loading = useSelector(selectUserLoading);
    const payPeriod = useAppSelector(selectEmployeePayPeriod);
    const employee = useSelector(selectEmployee);

    const doneHandler = () => {
        dispatch(clearUser());
    }
    const reloadHandler = () => {
        if (!payPeriod || !code) {
            return;
        }
        dispatch(getUserInfo({code, idPayPeriod: payPeriod.id}));
    }

    if (!employee) {
        return null;
    }

    return (
        <ClockButtons>
            <Button type="button" variant="primary" onClick={doneHandler}>
                <span>Done</span><span className="ms-1 bi-check" role="presentation"/>
            </Button>
            <Button variant="secondary" onClick={reloadHandler} disabled={loading}>
                <span>Reload</span><span className="ms-1 bi-arrow-clockwise" role="presentation"/>
            </Button>
        </ClockButtons>
    )
}
