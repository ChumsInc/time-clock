import classNames from "classnames";

export default function ViewPinIcon({visible}:{visible?:boolean}) {
    return (
        <span className={classNames({
            'bi-eye-slash': !visible,
            'bi-eye': visible
        })} aria-label="Show PIN"/>
    );
};

