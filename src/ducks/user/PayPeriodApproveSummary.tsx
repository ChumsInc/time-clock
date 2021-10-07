import React, {FormEvent, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ENTRY_PL} from "../../constants";
import PayPeriodSelect from "../payPeriods/PayPeriodSelect";
import TimeField from "./TimeField";
import parseISO from 'date-fns/parseISO';
import BlockButton from "../../components/BlockButton";
import {approvePayPeriodAction, getUserInfoAction, selectEmployee, selectUserCode, selectUserLoading} from "./index";
import classNames from "classnames";
import {Alert} from "chums-ducks";
import EmployeeName from "./EmployeeName";
import './ApprovalForm.scss';


const PayPeriodApproveSummary: React.FC = () => {
    const dispatch = useDispatch();
    const employee = useSelector(selectEmployee);
    const loading = useSelector(selectUserLoading);
    const code = useSelector(selectUserCode);

    useEffect(() => {
        if (!employee && !loading && !!code) {
            dispatch(getUserInfoAction());
        }
    }, [])

    if (!employee) {
        return null;
    }

    const {entries} = employee;
    const {
        weeks,
        id,
        approved,
        approvedByName,
        approvalTime,
        employeeApproved,
        employeeApprovalTime
    } = employee.payPeriod;


    const onApprove = (ev: FormEvent) => {
        ev.preventDefault();
        if (employeeApproved) {
            return;
        }
        dispatch(approvePayPeriodAction());
    }

    const onChangePayPeriod = (id: number) => {
        dispatch(getUserInfoAction(id));

    }

    const hasErrors = weeks[0].errors + weeks[1].errors > 0;
    const plTotal = entries.filter(entry => entry.idEntryType === ENTRY_PL).reduce((acc, entry) => acc + entry.Duration, 0);
    const isClockedIn = entries.reduce((acc, entry) => acc || entry.isClockedIn, false);

    const w1ClassName = classNames({'bg-danger': !!weeks[0].errors, 'text-light': !!weeks[0].errors});
    const w2ClassName = classNames({'bg-danger': !!weeks[1].errors, 'text-light': !!weeks[1].errors});
    const otClassName = classNames({'text-muted': weeks[0].overtime + weeks[1].overtime === 0})
    const plClassName = classNames({'text-muted': plTotal === 0});

    return (
        <div>
            <EmployeeName/>
            <div className="mb-3">
                <PayPeriodSelect id={id} onChange={onChangePayPeriod}/>
            </div>
            <div>
                <div className="tc__approval-form mb-3">
                    <TimeField label="Week 1" className={w1ClassName} seconds={weeks[0].duration}/>
                    <TimeField label="Week 2" className={w2ClassName} seconds={weeks[1].duration}/>
                    <TimeField label="Overtime" className={otClassName} seconds={weeks[0].overtime + weeks[1].overtime}/>
                    <TimeField label="Total" seconds={weeks[0].duration + weeks[1].duration}/>
                    <TimeField label="P/L" className={plClassName} seconds={plTotal}/>
                </div>

                {!employeeApproved && !isClockedIn && (
                    <BlockButton className={classNames({'btn-danger': hasErrors, 'btn-success': !hasErrors})}
                                 disabled={hasErrors}
                                 onClick={onApprove}
                                 type="button">
                        Approve Pay Period
                    </BlockButton>
                )}
                {isClockedIn && (
                    <Alert color="info" title="Notice:">You are currently still clocked in for this pay
                        period.</Alert>
                )}
                {employeeApproved && (
                    <Alert title="Approved:" color="success">You have approved this pay period
                        at <strong>{parseISO(employeeApprovalTime).toLocaleString()}</strong>
                    </Alert>
                )}
                {approved && (
                    <Alert title="Supervisor Approved:" color="success">{approvedByName} approved this pay period
                        at <strong>{parseISO(approvalTime).toLocaleString()}</strong>
                    </Alert>
                )}
                {hasErrors && (
                    <Alert title="Notice:" color="danger">Please see your supervisor to fix the following errors
                        before approving your time.</Alert>
                )}
            </div>
        </div>
    );
}

export default PayPeriodApproveSummary;
