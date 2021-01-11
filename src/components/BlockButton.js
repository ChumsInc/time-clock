import React from 'react';
import classNames from 'classnames';

const BlockButton = ({className = '', containerClassName = '', onClick, children, ...rest}) => {
    return (
        <div className={classNames("d-grid col-9 mx-auto tc__done-button", containerClassName)}>
            <button className={classNames("btn", className, {'btn-primary': !className})}
                    {...rest}
                    onClick={onClick}>
                {children}
            </button>
        </div>
    );
};

export default BlockButton;
