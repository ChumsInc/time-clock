import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {setTab} from '../actions/app';
import {TABS} from "../constants";
import TabItem from "./TabItem";

function mapStateToProps({app}) {
    const {tab} = app;
    return {
        tab,
    };
}

const mapDispatchToProps = {
    setTab,
};

class TabBar extends Component {
    static propTypes = {
        tab: PropTypes.string,
        setTab: PropTypes.func.isRequired,
    };
    static defaultProps = {
        tab: TABS[0].id,
    };

    render() {
        const {tab} = this.props
        return (
            <ul className="nav nav-tabs mb-2">
                {TABS.map(tabInfo => (
                    <TabItem key={tabInfo.id} active={tabInfo.id === tab} {...tabInfo} onClick={this.props.setTab}/>
                ))}
            </ul>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabBar);
