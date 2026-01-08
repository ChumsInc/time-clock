import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {useCallback, useEffect} from "react";
import {getUserInfo} from "@/ducks/user/actions.ts";
import {useSelector} from "react-redux";
import {selectEmployee, selectEmployeePayPeriod, selectUserLoading} from "@/ducks/user";
import CurrentDateTime from "@/components/common/CurrentDateTime.tsx";
import UserLoginForm from "@/components/user-info/UserLoginForm.tsx";
import {Accordion, Col, Row} from "react-bootstrap";
import EmployeeName from "@/components/common/EmployeeName.tsx";
import PayPeriodSelect from "@/components/PayPeriodSelect.tsx";
import PayPeriodApproveSummary from "@/components/user-info/PayPeriodApproveSummary.tsx";
import PayPeriodEntries from "@/components/user-info/PayPeriodEntries.tsx";
import UserDoneButtons from "@/components/user-info/UserDoneButtons.tsx";

export interface ApprovalContentProps {
    onLogin: (arg:string) => void;
    onCancel: () => void;
    code: string;
}

export default function ApprovalContent({code, onCancel, onLogin}: ApprovalContentProps) {
    const dispatch = useAppDispatch();
    const employee = useSelector(selectEmployee);
    const loading = useSelector(selectUserLoading);
    const payPeriod = useAppSelector(selectEmployeePayPeriod);
    const startTime = code ? 3000 : 0;

    const onChangePayPeriod = useCallback((id: number) => {
        dispatch(getUserInfo({code, idPayPeriod: id}))
    }, [code, dispatch]);

    useEffect(() => {
        if (!employee && !loading && !!code) {
            dispatch(getUserInfo({code}));
        }
    }, [dispatch, code, employee, loading]);

    return (
        <div>
            <CurrentDateTime/>
            <hr/>
            {!employee && (
                <UserLoginForm onLogin={onLogin} onCancel={onCancel} timerOffset={startTime}/>
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
            <UserDoneButtons/>
        </div>
    )
}
