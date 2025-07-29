import {Fragment, useEffect} from 'react';
import {useSelector} from 'react-redux';
import CurrentDateTime from "../common/CurrentDateTime";
import UserLoginForm from "./UserLoginForm";
import UserInfo from "./UserInfo";
import {clearUser, selectEmployee, selectEmployeePayPeriod, selectUserCode} from "@/ducks/user";
import UserDoneButtons from "./UserDoneButtons";
import {getUserInfo} from "@/ducks/user/actions";
import {useAppDispatch} from "@/app/configureStore";

const UserInfoPage = () => {
    const dispatch = useAppDispatch();
    const code = useSelector(selectUserCode);
    const employee = useSelector(selectEmployee);
    const payPeriod = useSelector(selectEmployeePayPeriod);

    useEffect(() => {
        if (employee?.id && !!code) {
            dispatch(getUserInfo({code}));
        }
    }, []);

    const loginHandler = () => {
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
                    <UserInfo/>
                </Fragment>
            )}
            {employee && (
                <UserDoneButtons code={code} idPayPeriod={payPeriod?.id}/>
            )}
        </div>
    );
}

export default UserInfoPage
