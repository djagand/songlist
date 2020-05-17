import isEmpty from 'lodash/isEmpty';
import { EXTRA_DOTS, API_ERROR } from '../constant/text';

export const processMutationError = err => {
    return API_ERROR;
};

export const convertObjectsToDropdownList = (objList, key, value) => {
    const dropdownList = [];

    objList && !isEmpty(objList) && objList.forEach(obj => {
        dropdownList.push({ label: obj[value], value: obj[key] });
    });

    return dropdownList;
};

export const filterSongsByText = (songs, filterText) => {
    let filteredSongs = [];
    let text = filterText.toLowerCase();
    if (!isEmpty(songs)) {
        filteredSongs = songs.filter(song => {
            const { title, album, artist } = song;
            return title.toLowerCase().includes(text) || album.toLowerCase().includes(text) || artist.toLowerCase().includes(text);
        });
    }

    return filteredSongs;
};

export const filterSongsByField = (songs, searchText, filterField) => {
    let filteredSongs = [];
    let text = searchText.toLowerCase();
    if (!isEmpty(songs)) {
        filteredSongs = songs.filter(song => {
            const { title, album, artist } = song;
            if (filterField === 'title') {
                return title.toLowerCase().includes(text);
            } else if (filterField === 'artist') {
                return artist.toLowerCase().includes(text);
            } else if (filterField === 'album') {
                return album.toLowerCase().includes(text);
            } else {
                return true;
            }
        });
    }

    return filteredSongs;
};

export const maxWordLength = (word, length) => {
    if (word && !isEmpty(word) && word.length > length) {
        word = word.substring(0, length);
        word += EXTRA_DOTS;
    }

    return word;
};
