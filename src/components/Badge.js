import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import {propTypes_ColorTypes} from "../myPropTypes";

export default class Badge extends Component {
    static propTypes = {
        type: PropTypes.oneOf([...propTypes_ColorTypes]),
        text: PropTypes.string,
        backgroundColor: PropTypes.string,
        className: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    };

    static defaultProps = {
        type: 'info',
        text: '',
        className: '',
    };

    render() {
        const {type, text, backgroundColor, className, children} = this.props;
        const styleClassName = propTypes_ColorTypes.includes(type)
            ? `badge-${type}`
            : 'badge-info';
        const badgeClassNames = classNames('badge badge-pill', styleClassName, className);
        return (
            <span className={badgeClassNames} style={{backgroundColor}}>{text || children || ''}</span>
        );
    }
}
