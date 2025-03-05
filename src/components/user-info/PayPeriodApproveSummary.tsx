import React, {FormEvent, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {ENTRY_PL} from "@/app/constants";
import TimeField from "./TimeField";
import BlockButton from "../BlockButton";
import {selectEmployee, selectEmployeePayPeriod, selectUserCode, selectUserLoading} from "@/ducks/user";
import classNames from "classnames";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectEntries} from "@/ducks/entries";
import {Accordion, Alert} from "react-bootstrap";
import {approvePayPeriod, getUserInfo} from "@/ducks/user/actions";
import dayjs from "dayjs";
import styled from "@emotion/styled";

const ApprovalForm = styled.div`
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 480px) {
        flex-direction: row;
        justify-content: space-between;
    }
`

const PayPeriodApproveSummary = ({eventKey}: { eventKey: string }) => {
    const dispatch = useAppDispatch();
    const employee = useSelector(selectEmployee);
    const payPeriod = useAppSelector(selectEmployeePayPeriod);
    const loading = useSelector(selectUserLoading);
    const code = useSelector(selectUserCode);
    const entries = useAppSelector(selectEntries);


    useEffect(() => {
        if (!employee && !loading && !!code) {
            dispatch(getUserInfo({code}));
        }
    }, [])

    if (!employee || !payPeriod) {
        return null;
    }

    const {
        weeks,
        id,
        approved,
        approvedByName,
        approvalTime,
        employeeApproved,
        employeeApprovalTime
    } = payPeriod;


    const onApprove = (ev: FormEvent) => {
        ev.preventDefault();
        if (employeeApproved) {
            return;
        }
        dispatch(approvePayPeriod({code, idEmployee: employee.id, idPayPeriod: payPeriod.id}));
    }


    const hasErrors = weeks[0].errors + weeks[1].errors > 0;
    const plTotal = entries.filter(entry => entry.idEntryType === ENTRY_PL).reduce((acc, entry) => acc + entry.Duration, 0);
    const isClockedIn = entries.reduce((acc, entry) => acc || entry.isClockedIn, false);

    const w1ClassName = classNames({'bg-danger': !!weeks[0].errors, 'text-bg-danger': !!weeks[0].errors});
    const w2ClassName = classNames({'bg-danger': !!weeks[1].errors, 'text-bg-danger': !!weeks[1].errors});
    const otClassName = classNames({'text-secondary': weeks[0].overtime + weeks[1].overtime === 0})
    const plClassName = classNames({'text-secondary': plTotal === 0});

    return (
        <Accordion.Item eventKey={eventKey}>
            <Accordion.Header>
                Period Summary
            </Accordion.Header>
            <Accordion.Body>
                <ApprovalForm className="mb-3">
                    <TimeField label="Week 1" className={w1ClassName} seconds={weeks[0].duration}/>
                    <TimeField label="Week 2" className={w2ClassName} seconds={weeks[1].duration}/>
                    <TimeField label="Overtime" className={otClassName}
                               seconds={weeks[0].overtime + weeks[1].overtime}/>
                    <TimeField label="Total" seconds={weeks[0].duration + weeks[1].duration}/>
                    <TimeField label="P/L" className={plClassName} seconds={plTotal}/>
                </ApprovalForm>
                {!employeeApproved && !isClockedIn && (
                    <BlockButton className={classNames({'btn-danger': hasErrors, 'btn-success': !hasErrors})}
                                 disabled={hasErrors}
                                 onClick={onApprove}
                                 type="button">
                        Approve Pay Period
                    </BlockButton>
                )}
                {isClockedIn && (
                    <Alert variant="info" title="Notice:">You are currently still clocked in for this pay
                        period.</Alert>
                )}
                {employeeApproved && (
                    <Alert title="Approved:" variant="success">You have approved this pay period
                        at <strong>{dayjs(employeeApprovalTime).format('ddd, DD MMM YYYY @ hh:mm a')}</strong>
                    </Alert>
                )}
                {approved && (
                    <Alert title="Supervisor Approved:" variant="success">{approvedByName} approved this pay period
                        at <strong>{dayjs(approvalTime).format('ddd, DD MMM YYYY @ hh:mm a')}</strong>
                    </Alert>
                )}
                {hasErrors && (
                    <Alert title="Notice:" variant="danger">Please see your supervisor to fix the following errors
                        before approving your time.</Alert>
                )}
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default PayPeriodApproveSummary;
