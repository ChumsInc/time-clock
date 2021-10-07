import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Time from "./Time";
import {getUserInfoAction, selectUserEntry, selectUserLoading} from "./index";

const EmployeeEntry: React.FC = () => {
    const dispatch = useDispatch();
    const entry = useSelector(selectUserEntry);
    const loading = useSelector(selectUserLoading);

    useEffect(() => {
        if (!entry && !loading) {
            dispatch(getUserInfoAction());
        }
    })

    return (
        <div className="tc__user-info--section">
            <h5>Latest Entry</h5>
            {entry && (
                <table className="table table-hover">
                    <caption>{new Date(entry.EntryDate * 1000).toLocaleDateString()}</caption>
                    <tbody>
                    <tr>
                        <th>Clock In</th>
                        <td className="right">
                            {!entry.clockInTime && <span>Missing</span>}
                            {!!entry.clockInTime &&
                            <span>{new Date(entry.clockInTime * 1000).toLocaleTimeString()}</span>}
                        </td>
                    </tr>
                    <tr>
                        <th>Clock Out</th>
                        <td className="right">
                            {!entry.clockOutTime && <span>-</span>}
                            {!!entry.clockOutTime &&
                            <span>{new Date(entry.clockOutTime * 1000).toLocaleTimeString()}</span>}
                        </td>
                    </tr>
                    <tr>
                        <th>Duration</th>
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
        </div>
    );
}

export default EmployeeEntry;
