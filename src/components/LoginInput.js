import React, {Component, createRef} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {setLoginCode} from '../actions/user';
import classNames from 'classnames';
import CancelIcon from "./CancelIcon";

function mapStateToProps({user}) {
    const {code} = user;
    return {code};
}

const mapDispatchToProps = {
    setLoginCode,
};

class LoginInput extends Component {
    static propTypes = {
        code: PropTypes.string,
        setLoginCode: PropTypes.func.isRequired,
    };
    static defaultProps = {
        code: '',
    };

    state = {
        showCode: false,
    }

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.ref = createRef();
    }

    componentDidMount() {
        if (this.props.code === '') {
            this.ref.current.focus();
        }
    }

    onChange(ev) {
        this.props.setLoginCode(ev.target.value)
    }

    onShow() {
        this.setState({showCode: true});
    }

    onHide() {
        this.setState({showCode: false});
    }

    onCancel() {
        this.props.setLoginCode('');
    }

    render() {
        const {code} = this.props;
        const {showCode} = this.state;
        const buttonClassNames = {
            'btn': true,
            'btn-outline-secondary': !showCode,
            'btn-secondary': !!showCode
        }
        return (
            <div className="input-group input-group-large login-input">
                <span className="input-group-text">Login</span>
                <input type={showCode ? 'text' : 'password'} className="form-control form-control-lg"
                       ref={this.ref}
                       value={code}
                       minLength={4}
                       required={true}
                       onChange={this.onChange}/>
                <button type="button" className={classNames(buttonClassNames)}
                        onMouseDown={this.onShow} onTouchStart={this.onShow}
                        onMouseUp={this.onHide} onTouchCancel={this.onHide} onTouchEnd={this.onHide} >
                    <span className="bi-eye-fill" title="View Password" />
                </button>
                <button type="button" className={classNames(buttonClassNames)} onClick={this.onCancel} >
                    <CancelIcon />
                </button>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginInput);
