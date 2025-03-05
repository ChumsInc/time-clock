import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import Time from "./Time";
import {selectUserCode, selectUserEntry, selectUserLoading} from "@/ducks/user";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {getUserInfo} from "@/ducks/user/actions";
import {UserInfoSection} from "@/components/user-info/UserInfoSection";
import {Accordion, AccordionItemProps, Alert} from "react-bootstrap";

const EmployeeEntry = ({eventKey}:{eventKey:string}) => {
    const dispatch = useAppDispatch();
    const code = useAppSelector(selectUserCode);
    const entry = useSelector(selectUserEntry);
    const loading = useSelector(selectUserLoading);

    useEffect(() => {
        if (!entry && !loading) {
            dispatch(getUserInfo({code}));
        }
    }, []);

    const clockInDate = !!entry?.EntryDate ? new Date(entry.EntryDate * 1000).toLocaleDateString() : null;
    const clockInTime = !!entry?.clockInTime ? new Date(entry.EntryDate * 1000).toLocaleTimeString() : 'missing';
    const clockOutDate = !!entry?.clockOutTime ? new Date(entry.clockOutTime * 1000).toLocaleDateString() : null;
    const clockOutTime = !!entry?.clockOutTime ? new Date(entry.clockOutTime * 1000).toLocaleTimeString() : (!!entry?.clockInTime ? 'clocked in' :'n/a');

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
                            <td className="text-center">{clockInDate}</td>
                            <td className="text-end">{clockInTime}</td>
                        </tr>
                        <tr>
                            <th scope="row">Clock Out</th>
                            <td className="text-center">
                                {clockOutDate}
                            </td>
                            <td className="text-end">{clockOutTime}</td>
                        </tr>
                        <tr>
                            <th scope="row" colSpan={2}>Duration</th>
                            <td className="right">
                                {!entry.clockInTime && <span>Error</span>}
                                {!!entry.Duration && (
                                    <Time seconds={entry.Duration}/>
                                )}
                                {!!entry.clockInTime && !entry.clockOutTime && (
                                    <Time seconds={Math.floor(Date.now() / 1000) - entry.clockInTime}
                                          showSeconds={true}
                                          showIncrement={true}/>
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

export default EmployeeEntry;
