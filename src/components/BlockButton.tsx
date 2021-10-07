import React, {ButtonHTMLAttributes} from 'react';
import classNames from 'classnames';

export interface BlockButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    containerClassName?: string,
}

const BlockButton: React.FC<BlockButtonProps> =
    ({
         className = '',
         containerClassName = '',
         type = 'button',
         onClick,
         children,
         ...rest
     }) => {
        return (
            <div className={classNames("d-grid col-9 mx-auto tc__done-button", containerClassName)}>
                <button type={type} className={classNames("btn", className, {'btn-primary': !className})}
                        {...rest}
                        onClick={onClick}>
                    {children}
                </button>
            </div>
        );
    };

export default BlockButton;
