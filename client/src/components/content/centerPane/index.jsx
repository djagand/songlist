import React, { useCallback, useState } from 'react';
import PopUp from '../../common/popUp';
import { useStore } from '../../../store';
import SearchBar from '../../common/searchBar';
import { EMPTY_STRING, LIBRARY, PLAYLIST_DETAIL } from '../../../constant/text';
import { LOAD } from '../../../constant/action';
import Playlist from './playlist';
import Library from './library';

const CenterPane = () => {
    const [searchText, setSearchText] = useState(EMPTY_STRING);
    const { dispatch, state: { popup = false, selectedPlaylist = {}, loaded = LIBRARY } } = useStore();
    const load = useCallback(payload => dispatch({ type: LOAD, payload }), [dispatch]);

    const onSearchChange = val => {
        setSearchText(val);
    };

    const onSearchBarClick = () => {
        load(LIBRARY);
    };

    return (
        <div className="centerPane padAround">
            {popup && <PopUp />}
            <div className="centerTopPane">
                <SearchBar value={searchText} onChange={onSearchChange} onFocus={onSearchBarClick} />
            </div>
            {loaded === PLAYLIST_DETAIL && <Playlist playlist={selectedPlaylist} />}
            {loaded === LIBRARY && <Library searchText={searchText} />}
        </div>
    );
}

export default CenterPane;
