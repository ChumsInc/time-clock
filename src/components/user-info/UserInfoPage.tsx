import {Fragment} from 'react';
import {useSelector} from 'react-redux';
import CurrentDateTime from "../common/CurrentDateTime";
import UserLoginForm from "./UserLoginForm";
import UserInfoLayout from "./UserInfoLayout.tsx";
import {clearUser, selectEmployee, selectEmployeePayPeriod} from "@/ducks/user";
import UserDoneButtons from "./UserDoneButtons";
import {getUserInfo} from "@/ducks/user/actions";
import {useAppDispatch} from "@/app/configureStore";

export default function UserInfoPage() {
    const dispatch = useAppDispatch();
    const employee = useSelector(selectEmployee);
    const payPeriod = useSelector(selectEmployeePayPeriod);

    const loginHandler = (code: string) => {
        dispatch(getUserInfo({code}));
    }

    const cancelHandler = () => {
        dispatch(clearUser());
    }

    return (
        <div>
            <CurrentDateTime/>
            <hr/>
            {!employee && (
                <UserLoginForm onLogin={loginHandler} onCancel={cancelHandler}/>
            )}
            {employee && payPeriod && (
                <Fragment>
                    <h2>Current Info</h2>
                    <UserInfoLayout/>
                </Fragment>
            )}
            <UserDoneButtons/>
        </div>
    );
}
