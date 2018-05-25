import React from 'react';
import PropTypes from 'prop-types';
/* styles */
import './checkbox.scss';

class Checkbox extends React.PureComponent {
    constructor(props) {
        super(props);
        this.labelClickHandler = this.labelClickHandler.bind(this);
    }

    getCheckboxLabelClass() {
        let checkboxClass = 'sten-checkbox';
        if (this.props.isChecked) {
            checkboxClass += ' sten-checkbox--checked';
        }
        if (this.props.className) {
            checkboxClass += ` ${this.props.className}`;
        }
        if (this.props.isDisabled) {
            checkboxClass += ' sten-checkbox--disabled';
        }
        return checkboxClass;
    }

    labelClickHandler(e) {
        e.stopPropagation();
        e.preventDefault();
        if (!this.props.isDisabled && this.props.onChange) {
            this.props.onChange(this.props.id);
        }
    }

    render() {
        return (
            <label
                className={this.getCheckboxLabelClass()}
                htmlFor={this.props.id}
                onClick={this.labelClickHandler}
                title={this.props.title}
            >
                <input
                    ref={(c) => { this.input = c; }}
                    type="checkbox"
                    id={this.props.id}
                    name={this.props.name || this.props.id}
                    defaultChecked={this.props.isChecked}
                    disabled={this.props.isDisabled}
                    value={this.props.value}
                />
                {this.props.children && <span className="sten-checkbox__label">{this.props.children}</span>}
            </label>
        );
    }
}

Checkbox.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isChecked: PropTypes.bool,
    isDisabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    title: PropTypes.string,
    value: PropTypes.string
};

export default Checkbox;
