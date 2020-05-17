import React, { useCallback } from 'react';
import Playlists from './playlists';
import SavePlaylist from '../centerPane/savePlaylist';
import { OPEN_POP_UP } from '../../../constant/action';
import { useStore } from '../../../store';
import { AddIcon } from '../../common/icon';
import { Link } from '../../common/text';

const LeftPane = () => {
    const { dispatch } = useStore();
    const openPopUp = useCallback(payload => dispatch({ type: OPEN_POP_UP, payload }), [dispatch]);

    const openCreatePlaylistPopup = () => {
        openPopUp({ component: <SavePlaylist /> });
    };

    return (
        <div className="leftPane padAround">
            <div className="leftPaneHome"></div>
            <div className="leftPaneLibrary"></div>
            <Playlists />
            <div className="iconWithText leftPaneAddPlaylist"><AddIcon onClick={openCreatePlaylistPopup} /><Link value="New Playlist" onClick={openCreatePlaylistPopup} /></div>
        </div >
    );
}

export default LeftPane;
