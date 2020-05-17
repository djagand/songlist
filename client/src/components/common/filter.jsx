import React, { useState } from 'react';
import { EMPTY_STRING } from '../../constant/text';
import { SearchIcon, CloseIcon } from '../common/icon';
import isEmpty from 'lodash/isEmpty';

const Filter = (props) => {
    const { placeholder = 'Filter', onChange } = props;
    const [focussed, setFocussed] = useState(false);
    const [filterText, setFilterText] = useState(EMPTY_STRING);

    const clearFilterText = () => {
        onChange(EMPTY_STRING);
        setFilterText(EMPTY_STRING);
        setFocussed(false);
    };

    const onFilterTextChange = val => {
        setFilterText(val);
        onChange(val);
    };

    return (
        <div className={`filter ${focussed ? 'filterInputonFocus' : EMPTY_STRING}`}>
            <SearchIcon className="filterIcon" />
            <input
                className="filterInput"
                value={filterText}
                placeholder={placeholder}
                onChange={e => onFilterTextChange(e.target.value)}
                autoComplete="off"
                onFocus={() => setFocussed(true)}
                onBlur={() => setFocussed(false)}
            />
            <CloseIcon className={`closeIcon ${!isEmpty(filterText) ? 'show' : "hide"}`} onClick={clearFilterText} />
        </div>
    );
};

export default Filter;
