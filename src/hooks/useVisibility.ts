import {useEffect, useState} from "react";

export const useVisibility = () => {
    const [visible, setVisible] = useState(document.visibilityState === 'visible');
    const visibilityChangeHandler = () => {
        setVisible(document.visibilityState === 'visible');
    }
    useEffect(() => {
        document.addEventListener('visibilitychange', visibilityChangeHandler);
        return () => {
            document.removeEventListener('visibilitychange', visibilityChangeHandler);
        }
    }, []);

    return visible;
}
