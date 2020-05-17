import React, { useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_SONGS, GET_PLAYLISTS, SAVE_PLAYLIST } from '../../../api';
import PlaylistInformation from './playlistInformation';
import Songs from './songs';
import { useStore } from '../../../store';
import { processMutationError } from '../../util';
import { SET_MESSAGE } from '../../../constant/action';
import { useEffect } from 'react';
import { useState } from 'react';
import Loader from '../../common/loader';

const Playlist = (props) => {
    const { playlist: inputPlaylist = {} } = props;
    const [playlist, setPlaylist] = useState(inputPlaylist);
    const { id, name } = playlist;
    const { data = {}, loading } = useQuery(GET_SONGS, { variables: { playlistId: id } });
    const { songs = [] } = data;
    const [savePlaylistMutation] = useMutation(SAVE_PLAYLIST);
    const { dispatch } = useStore();
    const setMessage = useCallback(payload => dispatch({ type: SET_MESSAGE, payload }), [dispatch]);

    useEffect(() => {
        setPlaylist(inputPlaylist);
    }, [inputPlaylist]);

    const removeFromPlaylist = selectedSongs => {
        let songsAfterRemoval = songs.filter(song => !selectedSongs.includes(song.id)).map(song => song.id);
        savePlaylistMutation({ variables: { id, name, songs: songsAfterRemoval }, refetchQueries: [{ query: GET_PLAYLISTS }, { query: GET_SONGS, variables: { playlistId: id } }] })
            .then((response) => {
                const { data } = response;
                setPlaylist(data.savePlaylist);
            })
            .catch(err => setMessage(processMutationError(err)));
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="playlistDetail">
            <PlaylistInformation playlist={playlist} />
            <Songs songs={songs} removeSongs={removeFromPlaylist} />
        </div>
    );
};

export default Playlist;
