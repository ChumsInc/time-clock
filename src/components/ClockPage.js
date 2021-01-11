import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Banner from "./Banner";
import ClockActionPage from "./ClockActionPage";

function mapStateToProps(state) {
    return {};
}

const mapDispatchToProps = {};

class ClockPage extends Component {
    static propTypes = {};
    static defaultProps = {};

    render() {
        return (
            <div className="row tc__clock-page">
                <div className="tc__clock-page--banner col-md-4">
                    <Banner />
                </div>
                <div className="tc__clock-page--action col-md-8">
                    <ClockActionPage />
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClockPage);
