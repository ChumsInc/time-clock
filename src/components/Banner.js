import React, {Component, createRef} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchBanners} from '../actions/banner';
import BannerIndicator from "./BannerIndicator";
import BannerItem from "./BannerItem";

function mapStateToProps({banner}) {
    const {list, loading} = banner;
    return {list, loading};
}

const mapDispatchToProps = {
    fetchBanners
};

class Banner extends Component {
    static propTypes = {
        list: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            filename: PropTypes.string,
            overlay: PropTypes.string
        })),
        loading: PropTypes.bool,
        fetchBanners: PropTypes.func.isRequired,
    };
    static defaultProps = {
        list: [],
        loading: false,
    };

    timer = null;

    state = {
        active: 0,
        direction: 1,
        inTransition: false,
        timer: null,
        transitionTimer: null,
        size: 0,
    }

    constructor(props) {
        super(props);
        this.carouselRef = createRef();
        this.setActiveBanner = this.setActiveBanner.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.onMoveNext = this.onMoveNext.bind(this);
        this.setIntervalTimer = this.setIntervalTimer.bind(this);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        window.clearInterval(this.timer);
    }

    componentDidMount() {
        this.props.fetchBanners();
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
        this.setIntervalTimer(5000);
    }

    setIntervalTimer(timeout) {
        clearInterval(this.timer);
        this.timer = window.setInterval(this.onMoveNext, timeout);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.active > 0 && this.state.active >= this.props.list.length) {
            this.setState({active: 0});
        }
    }

    handleResize() {
        this.setState({size: this.carouselRef.current.clientWidth});
    }

    setActiveBanner(id) {
        clearInterval(this.timer);
        this.setState({active: id});
        setTimeout(() => {
            this.setIntervalTimer(5000);
        }, 2000);
    }

    onMoveNext() {
        const next = this.state.active + 1;
        if (next > this.props.list.length) {
            this.setState({active: 0});
        } else {
            this.setState({active: next});
        }
    }


    render() {
        const {list} = this.props;

        const {active, size} = this.state;
        const maxHeight = `${size}px`;
        const height = `${size}px`;
        return (
            <div className="carousel slide tc__banner-carousel">
                <ol className="carousel-indicators">
                    {list.map((banner, index) => (
                        <BannerIndicator key={banner.id} active={index === active} onClick={() => this.setActiveBanner(index)}/>)
                    )}
                </ol>
                <div className="carousel-inner" style={{maxHeight, height}} ref={this.carouselRef}>
                    {list.map((banner, index) => (
                        <BannerItem key={banner.id} {...banner}
                                    active={index === active}
                                    onPause={() => {
                                    }}/>
                    ))}
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Banner);
