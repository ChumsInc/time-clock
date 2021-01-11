import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import CurrentDateTime from "./CurrentDateTime";
import UserLoginForm from "./UserLoginForm";
import {clearUser, getUserInfo} from '../actions/user';
import UserInfo from "./UserInfo";
import Banner from "./Banner";
import BlockButton from "./BlockButton";

function mapStateToProps({user}) {
    const {code, employee} = user;
    return {code, employee};
}

const mapDispatchToProps = {
    getUserInfo, clearUser
};

class LoginPage extends Component {
    static propTypes = {
        code: PropTypes.string,
        employee: PropTypes.shape({
            id: PropTypes.number,
            payPeriod: PropTypes.object,
        }),
        getUserInfo: PropTypes.func.isRequired,
        clearUser: PropTypes.func.isRequired,
    };
    static defaultProps = {
        code: '',
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
        const {employee} = this.props;
        return (
            <div className="row">
                <div className="tc__login-container col-md-4">
                    <CurrentDateTime/>
                    <hr/>
                    <Banner />
                </div>
                <div className="tc__login-container col-md-8">
                    <h1>Current Info</h1>
                    {!employee.id && (
                        <UserLoginForm onLogin={this.props.getUserInfo}
                                       onCancel={this.props.clearUser}/>
                    )}
                    {!!employee.id && !!employee.payPeriod && (
                        <Fragment>
                            <UserInfo/>
                            <BlockButton onClick={this.props.clearUser}>Done</BlockButton>
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
)(LoginPage);
