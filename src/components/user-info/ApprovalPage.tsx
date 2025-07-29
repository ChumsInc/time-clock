import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import CurrentDateTime from "../common/CurrentDateTime";
import UserLoginForm from "./UserLoginForm";
import PayPeriodEntries from "./PayPeriodEntries";
import PayPeriodApproveSummary from "./PayPeriodApproveSummary";
import {clearUser, selectEmployee, selectEmployeePayPeriod, selectUserCode, selectUserLoading} from "@/ducks/user";
import UserDoneButtons from "./UserDoneButtons";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {getUserInfo} from "@/ducks/user/actions";
import {Accordion, Col, Row} from "react-bootstrap";
import EmployeeName from "@/components/common/EmployeeName";
import PayPeriodSelect from "@/components/PayPeriodSelect";

const ApprovalPage = () => {
    const dispatch = useAppDispatch();
    const code = useSelector(selectUserCode);
    const employee = useSelector(selectEmployee);
    const loading = useSelector(selectUserLoading);
    const payPeriod = useAppSelector(selectEmployeePayPeriod);


    const [startTime, setStartTime] = useState(!!code ? 3000 : 0);

    useEffect(() => {
        if (!employee && !loading && !!code) {
            dispatch(getUserInfo({code}));
        }
    }, []);

    useEffect(() => {
        setStartTime(!!code ? 3000 : 0);
    }, [code])

    const onChangePayPeriod = useCallback((id: number) => {
        dispatch(getUserInfo({code, idPayPeriod: id}))
    }, [code]);


    return (
        <div>
            <CurrentDateTime/>
            <hr/>
            {!employee && (
                <UserLoginForm onLogin={() => dispatch(getUserInfo({code}))}
                               onCancel={() => dispatch(clearUser())}
                               timerOffset={startTime}/>
            )}
            {!!employee && !!payPeriod && (
                <div>
                    {payPeriod.completed && payPeriod.approved && (<h2>Pay Period History</h2>)}
                    {!payPeriod.approved && (<h2>Approve Pay Period</h2>)}
                    <Row className="g-3 mb-3">
                        <Col xs="auto">
                            <EmployeeName/>
                        </Col>
                        <Col/>
                        <Col xs="auto">
                            <PayPeriodSelect value={payPeriod.id} onChange={onChangePayPeriod}/>
                        </Col>
                    </Row>

                    {payPeriod && (
                        <Accordion defaultActiveKey={['approve', 'entries']} alwaysOpen className="mb-3">
                            <PayPeriodApproveSummary eventKey="approve"/>
                            <PayPeriodEntries eventKey="entries"/>
                        </Accordion>
                    )}
                </div>
            )}
            {!!employee && (
                <UserDoneButtons code={code} idPayPeriod={payPeriod?.id}/>
            )}
        </div>
    );
}

export default ApprovalPage;
