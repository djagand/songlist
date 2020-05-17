import React from 'react';
import { TextValue } from './text';
import { EMPTY_STRING, CHECKBOX_TICK } from '../../constant/text';

const Checkbox = props => {
    const { checked = false, onChange, value = EMPTY_STRING, disabled = false } = props;

    return (
        <div className="radioField">
            <div className={`checkbox ${disabled} ${checked ? 'checked' : 'notChecked'}`} onClick={disabled ? () => { } : () => onChange(!checked)}>{checked ? CHECKBOX_TICK : EMPTY_STRING}</div>
            <TextValue value={value} />
        </div>

    );
};

export default Checkbox;
