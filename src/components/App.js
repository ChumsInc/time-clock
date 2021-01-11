import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import TabBar from "./TabBar";
import {TABS} from "../constants";
import ClockPage from "./ClockPage";
import LoginPage from "./LoginPage";
import AlertList from "./AlertList";
import ApprovalPage from "./ApprovalPage";
import AppVersion from "./AppVersion";

function mapStateToProps({app}) {
    const {tab} = app;
    return {tab};
}

const mapDispatchToProps = {};

class App extends Component {
    static propTypes = {
        tab: PropTypes.string,
    };
    static defaultProps = {
        tab: TABS[0].id,
    };

    render() {
        const {tab} = this.props;
        return (
            <div className="container tc__container">
                <TabBar />
                <AlertList />
                {tab === 'clock' && (<ClockPage />)}
                {tab === 'login' && (<LoginPage />)}
                {tab === 'approve' && (<ApprovalPage />)}
                <footer>
                    <AppVersion />
                </footer>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
