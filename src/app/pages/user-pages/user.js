import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
/* actions */
import { getUser } from './user-actions';
import { getActiveNotifications } from './public/notifications/notifications-actions';
import { getSelectedCarNotifications } from './public/home/home-actions';
import { getRangeOptions } from './public/home/map-right-side-bar/car-info/car-info-actions';
/* components */
import HotkeysManager from 'components/hotkeys-manager/hotkeys-manager';

export class User extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getNotifications = this.getNotifications.bind(this);
    }

    componentWillMount() {
        this.props.getUser();
        this.props.getRangeOptions();
        this.getNotificationsInterval = setInterval(() => {
            this.getNotifications();
        }, 5 * 60000);
    }

    componentWillReceiveProps(nextProps) {
        for (let i = 0; i < nextProps.restrictedRoutes.length; i++) {
            if (nextProps.location.pathname.startsWith(nextProps.restrictedRoutes[i])) {
                hashHistory.replace('map');
                break;
            }
        }
        if (nextProps.user !== this.props.user) {
            this.getNotifications(nextProps);
        }

        if (this.props.settingUpdated !== nextProps.settingUpdated && nextProps.settingUpdated === 'mapFilters') {
            this.getNotifications(nextProps);
        }
    }

    componentWillUnmount() {
        if (this.getNotificationsInterval) {
            clearInterval(this.getNotificationsInterval);
        }
    }

    getNotifications(props = this.props) {
        const { permissions } = props;

        if (permissions && permissions.MenuNotifications) {
            props.getNotifications();
            if (props.selectedCarId) {
                props.getSelectedCarNotifications();
            }
        }
    }

    render() {
        if (!this.props.user || !this.props.rangeOptions) { return null; }
        return (
            <HotkeysManager pathName={this.props.location.pathname} >{this.props.children}</HotkeysManager>
        );
    }
}

User.propTypes = {
    children: PropTypes.node,
    getNotifications: PropTypes.func,
    getRangeOptions: PropTypes.func,
    getSelectedCarNotifications: PropTypes.func,
    getUser: PropTypes.func,
    location: PropTypes.objectOf(PropTypes.any),
    permissions: PropTypes.objectOf(PropTypes.any),
    rangeOptions: PropTypes.arrayOf(PropTypes.object),
    restrictedRoutes: PropTypes.arrayOf(PropTypes.any),
    selectedCarId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    settingUpdated: PropTypes.string,
    user: PropTypes.objectOf(PropTypes.any)
};

function mapStateToProps(state) {
    return {
        permissions: state.userReducer.permissions,
        rangeOptions: state.carInfoReducer.rangeOptions,
        restrictedRoutes: state.userReducer.restrictedRoutes,
        settingUpdated: state.userReducer.settingUpdated,
        selectedCarId: state.homeReducer.selectedCarId,
        user: state.userReducer.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getNotifications: () => getActiveNotifications(dispatch),
        getRangeOptions: () => getRangeOptions(dispatch),
        getSelectedCarNotifications: () => getSelectedCarNotifications(dispatch),
        getUser: () => getUser(dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
