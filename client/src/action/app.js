import { OPEN_POP_UP, CLOSE_POP_UP, CLEAR_MESSAGE, SET_MESSAGE, LOAD, SET_SELECTED_PLAYLIST, PLAY, PAUSE, SET_PLAYLISTS } from '../constant/action';
import { EMPTY_STRING, ERROR } from '../constant/text';

export const appAction = {
    [OPEN_POP_UP]: (state, payload) => {
        return {
            popup: {
                show: true,
                ...payload
            }
        };
    },
    [CLOSE_POP_UP]: (state, payload) => {
        return {
            popup: {
                show: false
            }
        };
    },
    [CLEAR_MESSAGE]: (state, payload) => {
        return {
            message: {
                show: false
            }
        };
    },
    [SET_MESSAGE]: (state, payload) => {
        let val = EMPTY_STRING;
        if (payload instanceof Array) {
            val = payload[0];
        } else {
            val = payload;
        }

        return {
            message: {
                show: true,
                status: ERROR,
                value: val
            }
        };
    },
    [LOAD]: (state, payload) => {
        return {
            loaded: payload
        };
    },
    [SET_SELECTED_PLAYLIST]: (state, payload) => {
        return {
            selectedPlaylist: payload
        };
    },
    [PLAY]: (state, payload) => {
        return {
            play: {
                song: payload,
                paused: false,
            }
        };
    },
    [PAUSE]: (state, payload) => {
        return {
            play: {
                song: payload,
                paused: true,
            }
        };
    },
    [SET_PLAYLISTS]: (state, payload) => {
        return {
            playlists: payload
        };
    },
};
