// Control component - src/components/customWidget/CustomWidgetControl.js
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

export default class AutoUuidWidgetControl extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        forID: PropTypes.string,
        value: PropTypes.node,
        classNameWrapper: PropTypes.string.isRequired
    };

    static defaultProps = {
        value: ''
    };

    componentDidMount() {
        const { value, onChange } = this.props;

        if (!value) {
            onChange(uuidv4());
        }
    }

    render() {
        const { value, classNameWrapper, forID } = this.props;

        return (
            <span id={forID} className={classNameWrapper}>
                {value}
            </span>
        );
    }

}