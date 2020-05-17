var { buildSchema } = require('graphql');
var resolver = require('./resolver');

var graphqlConfig = {
    schema: buildSchema(`
        type Query {
            songs(searchText: String, playlistId: Int): [Song]
            song(id: Int): Song
            playlists: [Playlist]
            playlist(id: Int): Playlist
        }
        type Mutation {
            savePlaylist(id: Int, name: String, songs: [Int]): Playlist
            deletePlaylist(id: Int): Int
        }
        type Song {
            id: Int
            album: String
            duration: Int
            title: String
            artist: String
        }
        type Playlist {
            id: Int
            name: String
            songs: [Int]
        }
    `),
    rootValue: {
        songs: (args) => resolver.getSongs(args).then(data => data),
        song: (args) => resolver.getSong(args).then(data => data),
        playlists: () => resolver.getPlaylists().then(data => data),
        playlist: (args) => resolver.getPlaylist(args).then(data => data),
        savePlaylist: (args) => resolver.saveThePlaylist(args).then(data => data),
        deletePlaylist: (args) => resolver.deleteThePlaylist(args).then(data => data),
    },
    graphiql: true
};

module.exports = graphqlConfig;
