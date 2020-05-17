import React from 'react';
import { Link } from '../../common/text';

const LibraryFilter = (props) => {
    const { searchBy } = props;

    return (
        <div className="libraryFilter">
            <Link value="By Songs" onClick={() => searchBy("title")} />
            <Link value="By Artists" onClick={() => searchBy("artist")} />
            <Link value="By Albums" onClick={() => searchBy("album")} />
            <Link value="See All" onClick={() => searchBy("all")} />
        </div>
    );
}

export default LibraryFilter;
