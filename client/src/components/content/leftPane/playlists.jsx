import React, { useCallback } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useQuery } from '@apollo/react-hooks';
import { Title, Link } from '../../common/text';
import { maxWordLength } from '../../util';
import { GET_PLAYLISTS } from '../../../api';
import { PLAYLIST_DETAIL, PLAYLIST_NAME_MAX_LENGTH } from '../../../constant/text';
import { SET_SELECTED_PLAYLIST, LOAD, SET_PLAYLISTS } from '../../../constant/action';
import { useStore } from '../../../store';
import Loader from '../../common/loader';
import { useEffect } from 'react';

const Playlists = () => {
    const { data = {}, loading } = useQuery(GET_PLAYLISTS);
    const { playlists = [] } = data;
    const { dispatch } = useStore();
    const setSelectedPlaylist = useCallback(payload => dispatch({ type: SET_SELECTED_PLAYLIST, payload }), [dispatch]);
    const setPlaylists = useCallback(payload => dispatch({ type: SET_PLAYLISTS, payload }), [dispatch]);
    const load = useCallback(payload => dispatch({ type: LOAD, payload }), [dispatch]);

    useEffect(() => {
        setPlaylists(playlists);
    }, [setPlaylists, playlists]);

    const onPlaylistNameClick = pl => {
        setSelectedPlaylist(pl);
        load(PLAYLIST_DETAIL);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="playlists">
            <Title value="PLAYLISTS" />
            <div className="scroll">
                {!isEmpty(playlists) && playlists.map(playlist => {
                    return (
                        <Link
                            key={playlist.id}
                            className="playlistName"
                            value={maxWordLength(playlist.name, PLAYLIST_NAME_MAX_LENGTH)}
                            onClick={() => onPlaylistNameClick(playlist)}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Playlists;
