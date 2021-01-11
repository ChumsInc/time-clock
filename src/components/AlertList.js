import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Alert from "./Alert";
import {connect} from 'react-redux';
import {dismissAlert} from '../actions/app';
import {propTypes_ColorTypes} from "../myPropTypes";

class AlertList extends Component {
    static propTypes = {
        alerts: PropTypes.arrayOf(PropTypes.shape({
            ...propTypes_ColorTypes,
        })).isRequired,
        typeFilter: PropTypes.string,
        onDismiss: PropTypes.func.isRequired,
    };

    static propDefaults = {
        alerts: [],
        typeFilter: null,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {alerts, typeFilter, onDismiss} = this.props;
        return (
            <div>
                {alerts
                    .filter(alert => !!typeFilter || typeFilter === alert.type)
                    .map((alert, key) => <Alert key={key} {...alert} onDismiss={onDismiss}/>)}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {alerts} = state.app;
    return {alerts};
};

const mapDispatchToProps = {
    onDismiss: dismissAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertList);

