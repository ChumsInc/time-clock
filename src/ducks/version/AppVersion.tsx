import {type MouseEvent, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {
    loadVersion,
    selectNextVersion,
    selectShouldReload,
    selectUpdateAvailable,
    selectVersion,
    selectVersionStatus
} from "./index";
import {Alert, Button} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import styled from "@emotion/styled";

const AlertContainer = styled.div`
    cursor: pointer;
`

const updateCheckInterval =  30 * 60 * 1000;


export default function AppVersion() {
    const dispatch = useAppDispatch();
    const version = useSelector(selectVersion);
    const updateAvailable = useSelector(selectUpdateAvailable);
    const nextVersion = useSelector(selectNextVersion);
    const status = useSelector(selectVersionStatus);
    const shouldReload = useAppSelector(selectShouldReload);
    const [ignored, setIgnored] = useState<string | null>(null);
    const intervalRef = useRef<number>(0);

    useEffect(() => {
        if (version) {
            const params = new URLSearchParams();
            params.set("version", version);
            const url = new URL(window.location.href);
            url.search = params.toString();
            window.history.replaceState({version}, '', url.toString());
        }
    }, [version]);

    useEffect(() => {
        dispatch(loadVersion());
        intervalRef.current = window.setInterval(() => {
            dispatch(loadVersion());
        }, updateCheckInterval);

        return () => {
            window.clearInterval(intervalRef.current);
        }
    }, [dispatch]);

    useEffect(() => {
        if (shouldReload) {
            document.location.reload();
        }
    }, [shouldReload]);


    const onClickUpdate = (ev: MouseEvent) => {
        ev.preventDefault();
        if (document) {
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
