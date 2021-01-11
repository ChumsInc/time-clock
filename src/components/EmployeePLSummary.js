import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Time from "./Time";
import classNames from 'classnames';

function mapStateToProps({user}) {
    const {CarryOverHours, HoursAccrued, HoursAvailable, HoursUsed} = user.employee;
    return {CarryOverHours, HoursAccrued, HoursAvailable, HoursUsed};
}

const mapDispatchToProps = {};

class EmployeePlSummary extends Component {
    static propTypes = {
        CarryOverHours: PropTypes.number,
        HoursAccrued: PropTypes.number,
        HoursAvailable: PropTypes.number,
        HoursUsed: PropTypes.number,
    };
    static defaultProps = {
        CarryOverHours: 0,
        HoursAccrued: 0,
        HoursAvailable: 0,
        HoursUsed: 0,
    };

    render() {
        const {CarryOverHours, HoursAccrued, HoursAvailable, HoursUsed} = this.props;
        return (
            <div className="tc__user-info--section">
                <h5>Personal Leave Summary</h5>
                <table className="table table-hover">
                    <tbody>
                    <tr>
                        <th>Carry Over</th>
                        <td className="right"><Time hours={CarryOverHours} /></td>
                    </tr>
                    <tr>
                        <th>Accrued</th>
                        <td className="right"><Time hours={HoursAccrued} /></td>
                    </tr>
                    <tr>
                        <th>Used</th>
                        <td className="right"><Time hours={HoursUsed} /></td>
                    </tr>
                    <tr className={classNames({'table-danger': HoursAvailable >= 195 || HoursAvailable < 8})}>
                        <th>Available</th>
                        <td className="right"><Time hours={HoursAvailable} /></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeePlSummary);
