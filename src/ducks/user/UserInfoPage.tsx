import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CurrentDateTime from "./CurrentDateTime";
import UserLoginForm from "./UserLoginForm";
import UserInfo from "./UserInfo";
import BannerCarousel from "../banners/BannerCarousel";
import {clearUserAction, getUserInfoAction, selectEmployee, selectUserCode} from "./index";
import './info-container.scss';
import UserDoneButtons from "./UserDoneButtons";

const UserInfoPage: React.FC = () => {
    const dispatch = useDispatch();
    const code = useSelector(selectUserCode);
    const employee = useSelector(selectEmployee);

    useEffect(() => {
        if (employee && !!code && !!employee.id && !employee.payPeriod) {
            dispatch(getUserInfoAction());
        }
    }, []);

    return (
        <div className="row">
            <div className="tc__user-info-container col-lg-4">
                <CurrentDateTime/>
                <hr/>
                <BannerCarousel/>
            </div>
            <div className="tc__user-info-container col-lg-8">
                {!employee && (
                    <UserLoginForm onLogin={() => dispatch(getUserInfoAction())}
                                   onCancel={() => dispatch(clearUserAction())}/>
                )}
                {employee && !!employee.payPeriod && (
                    <Fragment>
                        <h1>Current Info</h1>
                        <UserInfo/>
                        <UserDoneButtons/>
                    </Fragment>
                )}
            </div>
        </div>
    );
}

export default UserInfoPage
