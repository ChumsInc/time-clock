import React, {MouseEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchVersionAction, selectUpdateAvailable, selectVersion, selectVersionLoading} from "./index";
import {Alert} from "chums-ducks";

const updateCheckInterval = 30 * 60 * 1000;

const AppVersion: React.FC = () => {
    const dispatch = useDispatch();
    const version = useSelector(selectVersion);
    const updateAvailable = useSelector(selectUpdateAvailable);
    const loading = useSelector(selectVersionLoading);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        dispatch(fetchVersionAction());
        const timerHandle = window.setInterval(() => {
            dispatch(fetchVersionAction());
        }, updateCheckInterval);
        setTimer(timerHandle);

        return () => {
            window.clearInterval(timer);
        }
    }, []);


    const onClickUpdate = (ev: MouseEvent) => {
        ev.preventDefault();
        if (global.document) {
            document.location.reload();
        }
    }

    const onCheckVersion = () => dispatch(fetchVersionAction());


    return (
        <div>
            <span onClick={onCheckVersion}
                  className="app__version">Version: {version || (loading ? 'loading' : '')}</span>
            {updateAvailable && (
                <div onClick={onClickUpdate} className="app__version-popup">
                    <Alert color="info" title="Update Available">Click Here to refresh</Alert>
                </div>
            )}
        </div>
    );
}
export default AppVersion
