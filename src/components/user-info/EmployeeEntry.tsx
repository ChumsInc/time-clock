import {useEffect, useState} from 'react';
import TimeDisplay from "./TimeDisplay.tsx";
import {selectEmployee, selectUserCode, selectUserEntry, selectUserLoading} from "@/ducks/user";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {getUserInfo} from "@/ducks/user/actions";
import {Accordion, Alert} from "react-bootstrap";
import LocaleDate from "@/components/common/LocaleDate.tsx";
import LocaleTime from "@/components/common/LocaleTime.tsx";
import dayjs from "dayjs";
import {useVisibility} from "@/hooks/useVisibility.ts";

export default function EmployeeEntry({eventKey}: { eventKey: string }) {
    const dispatch = useAppDispatch();
    const code = useAppSelector(selectUserCode);
    const entry = useAppSelector(selectUserEntry);
    const loading = useAppSelector(selectUserLoading);
    const employee = useAppSelector(selectEmployee);
    const visible = useVisibility();
    const [currentDuration] = useState<number|null>(
        entry?.clockInTime && entry?.isClockedIn
            ? dayjs().subtract(entry.clockInTime, 'seconds').unix()
            : null
    );

    useEffect(() => {
        if (!entry && !loading) {
            dispatch(getUserInfo({code}));
        }
    }, [dispatch, code, loading, entry]);

    if (!employee || employee.PayMethod === 'S') {
        return null;
    }


    return (
        <Accordion.Item eventKey={eventKey}>
            <Accordion.Header>Latest Entry</Accordion.Header>
            <Accordion.Body>
                {!entry && <Alert variant="warning">No recent entry</Alert>}
                {entry && (
                    <table className="table table-hover">
                        <tbody>
                        <tr>
                            <th scope="row">Clock In</th>
                            <td className="text-center"><LocaleDate ts={entry?.EntryDate} /></td>
                            <td className="text-end"><LocaleTime ts={entry.clockInTime} fallback="missing" /></td>
                        </tr>
                        <tr>
                            <th scope="row">Clock Out</th>
                            <td className="text-center">
                                <LocaleDate ts={entry.clockOutTime} />
                            </td>
                            <td className="text-end">
                                <LocaleTime ts={entry.clockOutTime} fallback={entry?.clockInTime ? 'clocked in' : 'n/a'} />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" colSpan={2}>Duration</th>
                            <td className="right">
                                {!entry.clockInTime && <span>Error</span>}
                                {!!entry.Duration && (
                                    <TimeDisplay seconds={entry.Duration}/>
                                )}
                                {!!currentDuration && (
                                    <TimeDisplay seconds={currentDuration}
                                                 showSeconds={true}
                                                 showIncrement={visible}/>
                                )}
                            </td>
                        </tr>

                        </tbody>
                    </table>
                )}
            </Accordion.Body>

        </Accordion.Item>
    );
}
