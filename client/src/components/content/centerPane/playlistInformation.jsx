import React, { useCallback, useState, useEffect } from 'react';
import { EMPTY_STRING, LIBRARY } from '../../../constant/text';
import { SET_MESSAGE, LOAD, OPEN_POP_UP } from '../../../constant/action';
import SavePlaylist from './savePlaylist';
import ActionPane from '../../common/actionPane';
import { MoreIcon } from '../../common/icon';
import { Title } from '../../common/text';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_PLAYLIST, GET_PLAYLISTS } from '../../../api';
import { processMutationError } from '../../util';
import { useStore } from '../../../store';

const PlaylistInformation = (props) => {
    const { playlist: inputPlaylist = {} } = props;
    const [deletePlaylistMutation] = useMutation(DELETE_PLAYLIST);
    const { dispatch } = useStore();
    const [actions, setActions] = useState([]);
    const [showActionPane, setShowActionPane] = useState(false);
    const [playlist, setPlaylist] = useState(inputPlaylist);
    const { id: playlistId, name: playlistName = EMPTY_STRING, songs: songIds = [] } = playlist;
    const setMessage = useCallback(payload => dispatch({ type: SET_MESSAGE, payload }), [dispatch]);
    const load = useCallback(payload => dispatch({ type: LOAD, payload }), [dispatch]);
    const openPopUp = useCallback(payload => dispatch({ type: OPEN_POP_UP, payload }), [dispatch]);

    useEffect(() => {
        setPlaylist(inputPlaylist);
    }, [inputPlaylist]);

    const deletePlaylist = () => {
        deletePlaylistMutation({ variables: { id: playlistId }, refetchQueries: [{ query: GET_PLAYLISTS }] })
            .then(response => {
                setShowActionPane(false);
                load(LIBRARY);
            })
            .catch(err => setMessage(processMutationError(err)));
    };

    const editPlaylist = () => {
        openPopUp({ component: <SavePlaylist playlist={playlist} setPlaylist={setPlaylist} /> });
        setShowActionPane(false);
    };

    const onMoreIconClick = () => {
        setActions([
            {
                label: 'Edit Detail',
                onClick: editPlaylist
            },
            {
                label: 'Delete',
                onClick: deletePlaylist
            }
        ]);
        setShowActionPane(true);
    };

    return (
        <div className="playlistInformation">
            <div className="pictureContainer">
            </div>
            <div className="detail">
                <div className="playlistSummary">
                    <Title value="PLAYLIST" />
                    <div className="playlistNameTitle" onClick={editPlaylist}>{playlistName}</div>
                    <div className="songCounts">{songIds.length} Songs</div>
                    <MoreIcon className="iconOuterCircle" onClick={onMoreIconClick} />
                    {showActionPane && <ActionPane actions={actions} setShowActionPane={setShowActionPane} />}
                </div>
            </div>
        </div>
    );
}

export default PlaylistInformation;
