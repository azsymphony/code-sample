import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* actions */
import { setActiveInput } from '../wrapper/wrapper-actions';
/* styles */
import './input.scss';

export class Input extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.showKeyboard = this.showKeyboard.bind(this);
        this.setFocus = this.setFocus.bind(this);
        this.clearValue = this.clearValue.bind(this);
    }

    componentDidMount() {
        this.input.addEventListener('propertychange blur keyup paste input', (e) => {
            e.target.dispatchEvent('change');
        });
    }

    componentWillUnmount() {
        if (this.props.activeInput === this.input) {
            this.props.setActiveInput(null);
        }
    }

    onChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    }

    onFocusChange(isFocused) {
        if (this.props.onFocusChange) {
            this.props.onFocusChange(isFocused);
        }
        if ((this.props.onScreenKeyboardEnabled || this.props.showKeyboard)
            && !this.props.disabled && !this.props.readOnly) {
            if (isFocused && this.props.type !== 'button') {
                if (!this.props.showKeyboard && this.props.activeInput !== this.input) {
                    this.props.setActiveInput(this.input);
                }
                if (this.keyboardTimeout) {
                    clearTimeout(this.keyboardTimeout);
                }
            } else {
                this.keyboardTimeout = setTimeout(() => {
                    if (this.props.activeInput === this.input) {
                        this.props.setActiveInput(null);
                    }
                }, 300);
            }
        }
    }

    getInputClass() {
        let inputClass = 'sten-input__input';
        if (this.props.invalid) {
            if (this.props.warning) {
                inputClass += ' sten-input__input--warning';
            } else {
                inputClass += ' sten-input__input--invalid';
            }
        }
        if (this.props.preIcon) {
            inputClass += ' sten-input__input--has-pre';
        }
        if (this.props.postIcon) {
            inputClass += ' sten-input__input--has-post';
        }
        if (this.props.clearable) {
            inputClass += ' sten-input__input--clearable';
        }
        if (this.props.unit) {
            inputClass += ' sten-input__input--has-unit';
        }
        return inputClass;
    }

    getPreIconClass() {
        let preIconClass = 'icon sten-input__icon ';
        if (this.props.preIcon) {
            preIconClass += `${this.props.preIcon} sten-input__icon--pre`;
        }
        if (this.props.onPreIconClick) {
            preIconClass += ' cursor-pointer';
        }
        return preIconClass;
    }

    getPostIconClass() {
        let postIconClass = 'icon sten-input__icon ';
        if (this.props.postIcon) {
            postIconClass += `${this.props.postIcon} sten-input__icon--post`;
        }
        if (this.props.onPostIconClick) {
            postIconClass += ' cursor-pointer';
        }
        return postIconClass;
    }

    setFocus() {
        this.input.focus();
    }

    showKeyboard() {
        if (this.props.activeInput !== this.input) {
            this.props.setActiveInput(this.input);
        } else {
            this.props.setActiveInput(null);
        }
        this.input.focus();
    }

    clearValue(e) {
        e.stopPropagation();
        if (this.props.onChange) {
            this.props.onChange('');
        }
    }

    render() {
        let className = 'sten-input';
        if (this.props.className) {
            className += ` ${this.props.className}`;
        }
        if (this.props.disabled) {
            className += ' sten-input--disabled';
        }
        let keyboardIconClass = 'icon sten-input__icon icon-keyboard sten-input__keyboard-icon';
        if (this.props.activeInput === this.input) {
            keyboardIconClass += ' sten-input__keyboard-icon--active';
        }

        let inputValue = this.props.value || '';
        if (this.props.readOnly && this.props.displayValue) {
            inputValue = this.props.displayValue;
        }

        return (
            <div
                className={className}
                title={this.props.disabled && this.props.disabledMessage ? this.props.disabledMessage : ''}
                onClick={!this.props.disabled && this.props.onClick}
            >
                <input
                    onInput={this.onChange}
                    autoComplete={this.props.autoComplete}
                    autoFocus={this.props.autoFocus}
                    readOnly={this.props.readOnly}
                    ref={(input) => { this.input = input; }}
                    type={this.props.type}
                    className={this.getInputClass()}
                    name={this.props.name || this.props.id}
                    id={this.props.id}
                    value={inputValue}
                    placeholder={this.props.placeholder}
                    onChange={this.onChange}
                    onFocus={this.onFocusChange.bind(this, true)}
                    onBlur={this.onFocusChange.bind(this, false)}
                    disabled={this.props.disabled}
                />
                {this.props.preIcon &&
                    <span
                        className={this.getPreIconClass()}
                        onClick={this.props.onPreIconClick ? this.props.onPreIconClick : this.setFocus}
                    />
                }
                {this.props.clearable && this.props.value &&
                    <span
                        className="icon sten-input__icon sten-input__icon--clear icon-close"
                        onClick={this.clearValue}
                    />
                }
                {this.props.postIcon &&
                    <span
                        className={this.getPostIconClass()}
                        onClick={this.props.onPostIconClick ? this.props.onPostIconClick : this.setFocus}
                    />
                }
                {this.props.unit &&
                    <span className="sten-input__unit">{this.props.unit}</span>
                }
                {!this.props.disabled && this.props.showKeyboard &&
                    <span
                        className={keyboardIconClass}
                        onClick={this.showKeyboard}
                    />
                }
            </div>
        );
    }
}

Input.propTypes = {
    activeInput: PropTypes.objectOf(PropTypes.any),
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    clearable: PropTypes.bool,
    disabled: PropTypes.bool,
    disabledMessage: PropTypes.string,
    displayValue: PropTypes.string,
    id: PropTypes.string,
    invalid: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onFocusChange: PropTypes.func,
    onPostIconClick: PropTypes.func,
    onPreIconClick: PropTypes.func,
    onScreenKeyboardEnabled: PropTypes.bool,
    placeholder: PropTypes.string,
    postIcon: PropTypes.string,
    preIcon: PropTypes.string,
    readOnly: PropTypes.bool,
    setActiveInput: PropTypes.func,
    showKeyboard: PropTypes.bool,
    type: PropTypes.string,
    unit: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    warning: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        activeInput: state.wrapperReducer.activeInput,
        onScreenKeyboardEnabled: state.userReducer.settings && state.userReducer.settings.OnScreenKeyboardEnabled
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setActiveInput: input => setActiveInput(dispatch, input)
    };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Input);
