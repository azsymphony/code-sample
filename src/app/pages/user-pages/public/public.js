import React from 'react';
import PropTypes from 'prop-types';
/* components */
import LeftSideBar from './left-side-bar/left-side-bar';

export class Public extends React.PureComponent {
    render() {
        return (
            <div className="sten-content-page">
                <LeftSideBar />
                {this.props.children}
            </div>
        );
    }
}

Public.propTypes = {
    children: PropTypes.node
};

export default Public;
