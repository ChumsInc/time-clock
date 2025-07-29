import {type MouseEvent, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {loadVersion, selectNextVersion, selectUpdateAvailable, selectVersion, selectVersionStatus} from "./index";
import {Alert, Button} from "react-bootstrap";
import {useAppDispatch} from "@/app/configureStore";
import styled from "@emotion/styled";

const AlertContainer = styled.div`
    cursor: pointer;
`

const updateCheckInterval = 30 * 60 * 1000;

export default function AppVersion() {
    const dispatch = useAppDispatch();
    const version = useSelector(selectVersion);
    const updateAvailable = useSelector(selectUpdateAvailable);
    const nextVersion = useSelector(selectNextVersion);
    const status = useSelector(selectVersionStatus);
    const intervalRef = useRef<number>(0);
    const [ignored, setIgnored] = useState<string | null>(null);

    useEffect(() => {
        dispatch(loadVersion());
        intervalRef.current = window.setInterval(() => {
            dispatch(loadVersion());
        }, updateCheckInterval);

        return () => {
            window.clearInterval(intervalRef.current);
        }
    }, []);


    const onClickUpdate = (ev: MouseEvent) => {
        ev.preventDefault();
        if (global.document) {
            document.location.reload();
        }
    }

    const onCheckVersion = () => dispatch(loadVersion());

    const onDismissUpdate = () => {
        setIgnored(nextVersion);
    }

    return (
        <div>
            <Button variant="link" onClick={onCheckVersion}>Version: {version ?? status}</Button>
            {updateAvailable && (!ignored || ignored !== nextVersion) && (
                <AlertContainer onClick={onClickUpdate} tabIndex={0}>
                    <Alert variant="warning" aria-label="Update Available" dismissible onClose={onDismissUpdate}>
                        Click Here to refresh
                    </Alert>
                </AlertContainer>
            )}
        </div>
    );
}
