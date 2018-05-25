import React from 'react';
import PropTypes from 'prop-types';
/* styles */
import './accordion.scss';

class Accordion extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isCollapsed: false
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    componentWillMount() {
        if (typeof this.props.isCollapsed === 'boolean') {
            this.setState({
                isCollapsed: this.props.isCollapsed
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (typeof this.props.isCollapsed === 'boolean' && nextProps.isCollapsed !== this.props.isCollapsed
            && nextProps.isCollapsed !== this.state.isCollapsed) {
            this.setState({
                isCollapsed: nextProps.isCollapsed
            });
        }
    }

    toggleCollapse() {
        if (this.props.onToggleCollapse) {
            this.props.onToggleCollapse();
        } else {
            this.setState({ isCollapsed: !this.state.isCollapsed });
            if (this.props.onChange) {
                this.props.onChange(!this.state.isCollapsed);
            }
        }
    }

    render() {
        let accordionClass = 'sten-accordion';

        if (this.state.isCollapsed) {
            accordionClass += ' sten-accordion--collapsed';
        }
        if (this.props.className) {
            accordionClass += ` ${this.props.className}`;
        }
        let accordionHeaderClass = 'sten-accordion__header flex flex-center';
        if (this.props.chevronRight) {
            accordionHeaderClass += ' sten-accordion__header--chevron-right';
        }

        return (
            <div className={accordionClass}>
                <header className={accordionHeaderClass} onClick={this.toggleCollapse}>
                    <span className="icon icon-chevron-down sten-accordion__chevron" />
                    {this.props.header}
                </header>
                <section className="sten-accordion__body">
                    {this.props.children}
                </section>
            </div>
        );
    }
}

Accordion.propTypes = {
    chevronRight: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    header: PropTypes.node,
    isCollapsed: PropTypes.bool,
    onChange: PropTypes.func,
    onToggleCollapse: PropTypes.func
};

export default Accordion;
