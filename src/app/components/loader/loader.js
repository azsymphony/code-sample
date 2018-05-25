import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* styles */
import './loader.scss';
import loaderOuterSrc from 'assets/images/loader/loader_outer_circle.svg';
import loaderInnerSrc from 'assets/images/loader/loader_inner_circle.svg';

export class Loader extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isLoaderShown: this.props.isLoaderShown
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                isLoaderShown: nextProps.isLoaderShown
            });
        }
    }

    render() {
        if (!this.props.isLoaderShown) {
            return null;
        }
        return (
            <div className="sten-loader">
                <div className="sten-loader__segments">
                    <img
                        src={loaderOuterSrc}
                        className="sten-loader__segment sten-loader__segment--outer"
                        role="presentation"
                    />
                    <img
                        src={loaderInnerSrc}
                        className="sten-loader__segment sten-loader__segment--inner"
                        role="presentation"
                    />
                </div>
            </div>
        );
    }
}

Loader.propTypes = {
    children: PropTypes.node,
    isLoaderShown: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        isLoaderShown: state.loaderReducer.isLoaderShown
    };
}

export default connect(mapStateToProps)(Loader);
