import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CurrentDateTime from "./CurrentDateTime";
import UserLoginForm from "./UserLoginForm";
import PayPeriodEntries from "./PayPeriodEntries";
import PayPeriodApproveSummary from "./PayPeriodApproveSummary";
import BannerCarousel from "../banners/BannerCarousel";
import {clearUserAction, getUserInfoAction, selectEmployee, selectUserCode, selectUserLoading} from "./index";
import './info-container.scss';
import UserDoneButtons from "./UserDoneButtons";

const ApprovalPage: React.FC = () => {
    const dispatch = useDispatch();
    const code = useSelector(selectUserCode);
    const employee = useSelector(selectEmployee);
    const loading = useSelector(selectUserLoading);

    const [startTime, setStartTime] = useState(!!code ? 3000 : 0);

    useEffect(() => {
        if (!employee && !loading && !!code) {
            dispatch(getUserInfoAction());
        }
    }, []);

    useEffect(() => {
        setStartTime(!!code ? 3000 : 0);
    }, [code])

    return (
        <div className="row">
            <div className="tc__approval-container col-lg-4">
                <CurrentDateTime/>
                <hr/>
                <BannerCarousel/>
            </div>
            <div className={"tc__approval-container col-lg-8"}>
                {!employee && (
                    <UserLoginForm onLogin={() => dispatch(getUserInfoAction())}
                                   onCancel={() => dispatch(clearUserAction())}
                                   timerOffset={startTime}/>
                )}
                {!!employee && (
                    <>
                        {employee.payPeriod?.completed && (<h1>Pay Period History</h1>)}
                        {employee.payPeriod?.completed === false && (<h1>Approve Pay Period</h1>)}
                        {employee.payPeriod && (
                            <>
                                <PayPeriodApproveSummary/>
                                <hr className="mb-3"/>
                                <PayPeriodEntries/>
                                <UserDoneButtons/>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default ApprovalPage;
