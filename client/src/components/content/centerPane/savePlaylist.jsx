import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import TextField from '../../common/textField';
import PopUpCloseIcon from '../../common/popUpCloseIcon';
import { Title, Button } from '../../common/text';
import isEmpty from 'lodash/isEmpty';
import { EMPTY_STRING, WARNING, REQUIRED_FIELD } from '../../../constant/text';
import { CLOSE_POP_UP, SET_MESSAGE } from '../../../constant/action';
import { useStore } from '../../../store';
import { SAVE_PLAYLIST, GET_PLAYLISTS } from '../../../api';
import { processMutationError } from '../../util';

const SavePlaylist = (props) => {
    const { playlist = {}, setPlaylist = () => { } } = props;
    const { id, name: playlistName = EMPTY_STRING, songs = [] } = playlist;
    const [name, setName] = useState(playlistName);
    const [nameError, setNameError] = useState(EMPTY_STRING);
    const [disabled, setDisabled] = useState(false);
    const { dispatch } = useStore();
    const closePopUp = useCallback(payload => dispatch({ type: CLOSE_POP_UP, payload }), [dispatch]);
    const setMessage = useCallback(payload => dispatch({ type: SET_MESSAGE, payload }), [dispatch]);
    const [savePlaylistMutation] = useMutation(SAVE_PLAYLIST);

    const savePlaylist = () => {
        setDisabled(true);
        if (!isEmpty(name)) {
            savePlaylistMutation({
                variables: { id: id ? id : null, name, songs },
                refetchQueries: [{ query: GET_PLAYLISTS }]
            })
                .then(response => {
                    const { data } = response;
                    const { savePlaylist } = data;
                    setPlaylist(savePlaylist);
                    setInterval(closePopUp(), 2000);
                })
                .catch(error => {
                    setMessage(processMutationError(error));
                });
            closePopUp();
        } else {
            setNameError(REQUIRED_FIELD);
            setDisabled(false);
        }
    };

    return (
        <div className="popUpComponent">
            <PopUpCloseIcon blur={false} />
            <div className="popUpBody">
                <Title value={id ? 'Edit Playlist' : 'Create Playlist'} size={'m'} />
                <TextField
                    placeholder="My Playlist"
                    value={name}
                    onChange={setName}
                    label="Playlist Name"
                    required={true}
                    errorType={WARNING}
                    errorMessage={nameError}
                />
                <div className="buttonField-center">
                    <Button onClick={savePlaylist} value={id ? "SAVE" : "CREATE"} disabled={disabled} />
                </div>
            </div>
        </div>
    );
}

export default SavePlaylist;
