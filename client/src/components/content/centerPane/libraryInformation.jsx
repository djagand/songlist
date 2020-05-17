import React from 'react';
import isEmpty from 'lodash/isEmpty';

const LibraryInformation = (props) => {
    const { searchText, songsFound = false } = props;

    return (
        <div className="libraryInformation">
            {songsFound && isEmpty(searchText) && <div>Showing all results</div>}
            {songsFound && !isEmpty(searchText) && <div>Showing results for {searchText}</div>}
        </div>
    );
}

export default LibraryInformation;
