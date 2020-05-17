import React from 'react';
import { EMPTY_STRING } from '../../constant/text';
import { SearchIcon, CloseIcon } from '../common/icon';
import isEmpty from 'lodash/isEmpty';

const SearchBar = (props) => {
    const { value, placeholder = 'Search', onChange, onFocus = () => { } } = props;

    const clearSearchText = () => {
        onChange(EMPTY_STRING);
    };

    return (
        <div className="searchBar">
            <SearchIcon />
            <input
                className="searchInput"
                value={value ? value : EMPTY_STRING}
                placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
                autoComplete="off"
                onFocus={onFocus}
            />
            {value && !isEmpty(value) && (
                <div className="closeIcon">
                    <CloseIcon onClick={clearSearchText} />
                </div>
            )}
        </div>
    );
};

export default SearchBar;
