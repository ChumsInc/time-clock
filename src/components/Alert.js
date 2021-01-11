import React, {Component} from 'react';
import classNames from "classnames";
import Badge from "./Badge";
import {defaultProps_Alert, propTypes_Alert, propTypes_ColorTypes} from "../myPropTypes";

const AlertDismisser = ({onDismiss}) => {
    return (
        <button type="button" className="close" aria-label="Close"
                onClick={() => onDismiss()}>
            <span aria-hidden="true">&times;</span>
        </button>
    )
};

export default class Alert extends Component {
    static propTypes = {
        ...propTypes_Alert,
    };

    static defaultProps = {
        ...defaultProps_Alert,
    }

    state = {
        error: null,
        errorInfo: null,
    };

    constructor(props) {
        super(props);
        this.onDismiss = this.onDismiss.bind(this);
    }

    componentDidCatch(error, errorInfo) {
        this.setState({error, errorInfo});
    }


    onDismiss() {
        const {id} = this.props;
        this.props.onDismiss(id);
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div className="alert alert-danger">
                    <details style={{whiteSpace: 'pre-wrap'}}>
                        {this.state.error && this.state.error.toString()}
                        <br/>
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            )
        }

        const {title, message, type, onDismiss, children, count} = this.props;
        const dismissible = typeof onDismiss === 'function';
        const alertClassName = propTypes_ColorTypes.includes(type)
            ? `alert-${type}`
            : 'alert-info';
        const className = classNames('alert my-3', alertClassName, {
            'alert-dismissible': dismissible
        });

        return (
            <div className={className}>
                <strong className="mr-1">{title || ''}</strong>
                {message || children}
                {!!count && count > 1 && (
                    <Badge type={type} text={String(count)}/>
                )}
                {dismissible && <AlertDismisser onDismiss={this.onDismiss}/>}
            </div>
        )
    }
}
