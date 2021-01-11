import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

function mapStateToProps({user}) {
    const {id, FirstName, LastName} = user.employee;
    return {id, FirstName, LastName};
}

const mapDispatchToProps = {};

class EmployeeName extends Component {
    static propTypes = {
        id: PropTypes.number,
        FirstName: PropTypes.string,
        LastName: PropTypes.string,
    };
    static defaultProps = {
        id: 0,
        FirstName: '',
        LastName: '',
    };

    render() {
        const {id, FirstName, LastName} = this.props;
        if (!id) {
            return null;
        }
        return (
            <h3>{FirstName} {LastName}</h3>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeName);
