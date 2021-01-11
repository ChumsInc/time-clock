import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import CurrentDateTime from "./CurrentDateTime";
import UserLoginForm from "./UserLoginForm";
import {clearUser, getUserInfo} from '../actions/user';
import PayPeriodEntries from "./PayPeriodEntries";
import PayPeriodApproveSummary from "./PayPeriodApproveSummary";
import Banner from "./Banner";
import ProgressBar from "./ProgressBar";

function mapStateToProps({user}) {
    const {code, employee, loading} = user;
    return {code, employee, loading};
}

const mapDispatchToProps = {
    getUserInfo, clearUser
};

class ApprovalPage extends Component {
    static propTypes = {
        code: PropTypes.string,
        employee: PropTypes.shape({
            id: PropTypes.number,
            payPeriod: PropTypes.object,
        }),
        loading: PropTypes.bool,
        getUserInfo: PropTypes.func.isRequired,
        clearUser: PropTypes.func.isRequired,
    };
    static defaultProps = {
        code: '',
        employee: {},
        loading: false,
    };

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (!!this.props.employee.id && !this.props.employee.payPeriod) {
            this.props.getUserInfo();
        }
    }

    onSubmit(ev) {
        ev.preventDefault();
        this.props.getUserInfo();
    }

    render() {
        const {code, employee, loading} = this.props;
        const startTime = !!code ? 3000 : 0;
        return (
            <div className="row">
                <div className="tc__approval-container col-lg-4">
                    <CurrentDateTime/>
                    <hr/>
                    <Banner/>
                </div>
                <div className={"tc__approval-container col-lg-8"}>
                    <h1>Approve</h1>
                    {!!loading && <ProgressBar striped={true} />}
                    {!employee.id && (
                        <UserLoginForm onLogin={this.props.getUserInfo}
                                       onCancel={this.props.clearUser}
                                       timerOffset={startTime}/>
                    )}
                    {!!employee.id && !!employee.payPeriod && (
                        <Fragment>
                            <PayPeriodApproveSummary/>
                            <hr className="mb-3"/>
                            <PayPeriodEntries/>
                            <button className="btn btn-block btn-primary"
                                    onClick={this.props.clearUser}>
                                Done
                            </button>
                        </Fragment>
                    )}
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApprovalPage);
