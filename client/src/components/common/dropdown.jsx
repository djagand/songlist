import React from 'react';
import { DROPDOWN_SELECT_TEXT_VALUE, EMPTY_STRING } from '../../constant/text';

const Dropdown = props => {
    const { options, value, size = 'm', className = EMPTY_STRING, keyPrefix = EMPTY_STRING, selectLabel, onChange } = props;
    const selectObject = { label: selectLabel, value: DROPDOWN_SELECT_TEXT_VALUE };

    if (selectLabel && !options.some(option => option.label === selectLabel)) {
        options.unshift(selectObject);
    }

    return (
        <select className={`${size} ${className}`} onChange={e => onChange(e.target.value)} value={value}>
            {
                options.map(obj => {
                    return <option className="option" key={`${keyPrefix}-${obj.value}`} value={obj.value}>{obj.label}</option>;
                })
            }
        </select>
    );
};

export default Dropdown;
