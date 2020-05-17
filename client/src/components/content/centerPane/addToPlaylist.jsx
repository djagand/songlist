import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import TextField from '../../common/textField';
import Dropdown from '../../common/dropdown';
import PopUpCloseIcon from '../../common/popUpCloseIcon';
import { Title, Button } from '../../common/text';
import isEmpty from 'lodash/isEmpty';
import { EMPTY_STRING, WARNING, DROPDOWN_SELECT_TEXT_VALUE, REQUIRED_FIELD } from '../../../constant/text';
import { CLOSE_POP_UP, SET_MESSAGE, SET_SELECTED_PLAYLIST } from '../../../constant/action';
import { useStore } from '../../../store';
import { SAVE_PLAYLIST, GET_PLAYLISTS, GET_SONGS, GET_PLAYLIST } from '../../../api';
import { processMutationError, convertObjectsToDropdownList } from '../../util';

const AddToPlaylist = (props) => {
    const { setSelectedSongs, selectedSongs = [] } = props;
    const [playlistId, setPlaylistId] = useState(DROPDOWN_SELECT_TEXT_VALUE);
    const [name, setName] = useState();
    const [nameError, setNameError] = useState(EMPTY_STRING);
    const [disabled, setDisabled] = useState(false);
    const { dispatch, state: { playlists = [] } } = useStore();

    const closePopUp = useCallback(payload => dispatch({ type: CLOSE_POP_UP, payload }), [dispatch]);
    const setMessage = useCallback(payload => dispatch({ type: SET_MESSAGE, payload }), [dispatch]);
    const setSelectedPlaylist = useCallback(payload => dispatch({ type: SET_SELECTED_PLAYLIST, payload }), [dispatch]);

    const [savePlaylistMutation] = useMutation(SAVE_PLAYLIST);

    const getExistingSongsFromPlaylist = plId => {
        return playlists.filter(playlist => Number(playlist.id) === Number(plId))[0].songs;
    };

    const getExistingNameFromPlaylist = plId => {
        return playlists.filter(playlist => Number(playlist.id) === Number(plId))[0].name;
    }

    const isValid = () => {
        if (isNewPlaylist()) {
            if (isEmpty(name)) {
                setNameError(REQUIRED_FIELD);
                return false;
            }
        } else {
            if (isEmpty(selectedSongs)) {
                setMessage('Atleast one song should be selected');
                return false;
            }
            if (isNewPlaylist()) {
                setMessage('Invalid playlist id');
                return false;
            }
        }

        return true;
    };

    const createPlaylist = () => {
        setDisabled(true);
        if (isValid()) {
            let variables = {
                id: isNewPlaylist() ? null : Number(playlistId),
                name: isNewPlaylist() ? name : getExistingNameFromPlaylist(playlistId),
                songs: isNewPlaylist() ? selectedSongs : [...selectedSongs, ...getExistingSongsFromPlaylist(playlistId)]
            };
            savePlaylistMutation({
                variables,
                refetchQueries: isNewPlaylist() ? (
                    [
                        { query: GET_PLAYLISTS },
                        { query: GET_SONGS }
                    ]
                ) : (
                        [
                            { query: GET_PLAYLISTS },
                            { query: GET_SONGS },
                            { query: GET_SONGS, variables: { playlistId: Number(playlistId) } },
                            { query: GET_PLAYLIST, variables: { id: Number(playlistId) } }
                        ]
                    )
            })
                .then(response => {
                    const { data } = response;
                    setSelectedPlaylist(data.savePlaylist);
                    setSelectedSongs([]);
                    setInterval(closePopUp(), 5000);
                })
                .catch(error => {
                    setMessage(processMutationError(error));
                });

        } else {
            setDisabled(false);
        }
    };

    const isNewPlaylist = () => {
        return Number(playlistId) === Number(DROPDOWN_SELECT_TEXT_VALUE);
    };

    return (
        <div className="popUpComponent">
            <PopUpCloseIcon blur={false} />
            <div className="popUpBody">
                <Title value={'Add to playlist'} size={'m'} />
                <Dropdown
                    options={convertObjectsToDropdownList(playlists, 'id', 'name')}
                    onChange={setPlaylistId}
                    value={playlistId}
                    selectLabel="Create New Playlist"
                />
                {isNewPlaylist() && (
                    <TextField
                        placeholder="My Playlist"
                        value={name}
                        onChange={setName}
                        label="Playlist Name"
                        required={true}
                        errorType={WARNING}
                        errorMessage={nameError}
                    />
                )}
                <div className="buttonField-center">
                    <Button
                        onClick={createPlaylist}
                        value={isNewPlaylist() ? "CREATE" : "SAVE"}
                        disabled={disabled}
                    />
                </div>
            </div>
        </div>
    );
}

export default AddToPlaylist;
