export const toSeconds = ({hours = 0, minutes = 0, seconds = 0}) => {
    return (hours || 0) * 3600
        + (minutes || 0) * 60
        + (seconds || 0);
}

export const calcTimeUnits = (val) => {
    const hours = Math.floor(val / 3600);
    const minutes = Math.floor((val - (hours * 3600)) / 60);
    const seconds = Math.floor(val - (hours * 3600) - (minutes * 60));
    return {hours, minutes, seconds};
}

