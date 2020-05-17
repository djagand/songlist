var path = require('path');
var Songs = require('./songs');
var library = new Songs(path.join(__dirname, '..', 'data'));

const getSongs = (args) => new Promise((resolve, reject) => {
    if (args.playlistId) {
        resolve(library.getPlaylistSongs(args.playlistId));
    } else if (args.searchText) {
        resolve(library.getLibrary(args.searchText));
    } else {
        resolve(library.getLibrary());
    }
});

const getSong = (args) => new Promise((resolve, reject) => {
    if (args.id) {
        var id = parseInt(args.id, 10);
        resolve(library.getSong(id));
    }

    resolve({});
});

const getPlaylists = () => new Promise((resolve, reject) => {
    return library.getPlaylists(function (err, playlists) {
        if (err) {
            return reject(err);
        }
        resolve(playlists);
    });
});

const saveThePlaylist = (args) => new Promise((resolve, reject) => {
    if (args.name || args.id) {
        return library.savePlaylist(args.id, args.name, args.songs, function (err, playlist) {
            if (err) {
                return reject(err);
            }
            resolve(playlist);
        });
    }

    return ({});
});

const deleteThePlaylist = (args) => new Promise((resolve, reject) => {
    if (args.id) {
        var id = parseInt(args.id, 10);
        resolve(library.deletePlaylist(id));
    }

    resolve(id);
});

const getPlaylist = (args) => new Promise((resolve, reject) => {
    if (args.id) {
        var id = parseInt(args.id, 10);
        resolve(library.getPlaylist(id));
    }

    resolve({});
});

module.exports = {
    getSongs,
    getSong,
    getPlaylists,
    saveThePlaylist,
    deleteThePlaylist,
    getPlaylist
};
