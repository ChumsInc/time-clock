import React, {Fragment, useEffect} from 'react';
import {useSelector} from 'react-redux';
import CurrentDateTime from "../common/CurrentDateTime";
import UserLoginForm from "./UserLoginForm";
import UserInfo from "./UserInfo";
import {clearUser, selectEmployee, selectEmployeePayPeriod, selectUserCode} from "@/ducks/user";
import UserDoneButtons from "./UserDoneButtons";
import {getUserInfo} from "@/ducks/user/actions";
import {useAppDispatch} from "@/app/configureStore";
import PageContainer from "@/components/common/PageContainer";

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

    return (
        <PageContainer>
            <CurrentDateTime/>
            <hr/>
            {!employee && (
                <UserLoginForm onLogin={() => dispatch(getUserInfo({code}))}
                               onCancel={() => dispatch(clearUser())}/>
            )}
            {employee && payPeriod && (
                <Fragment>
                    <h2>Current Info</h2>
                    <UserInfo/>
                </Fragment>
            )}
            {employee && (
                <UserDoneButtons code={code} idPayPeriod={payPeriod?.id} />
            )}
        </PageContainer>
    );
}

export default UserInfoPage
