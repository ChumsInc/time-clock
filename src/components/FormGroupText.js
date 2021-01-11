import React from 'react';
import classNames from "classnames";

const FormGroupText = ({label, className = '', children}) => {
    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <div className={classNames("form-control", className)}>
                {children}
            </div>
        </div>
    );
};

export default FormGroupText;
