import { appAction } from './app';
import { LIBRARY } from '../constant/text';

const initialStates = {
    popup: {
        show: false
    },
    message: {
        show: false
    },
    selectedPlaylist: {},
    loaded: LIBRARY,
    play: {},
    playlists: []
};

const actions = {
    ...appAction
};

export { initialStates, actions };
