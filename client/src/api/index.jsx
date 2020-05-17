import { gql } from 'apollo-boost';

export const GET_SONGS = gql`
  query($searchText: String, $playlistId: Int){
    songs(searchText: $searchText, playlistId: $playlistId) {
        id,
        album,
        duration,
        title,
        artist
    }
  }
`;

export const SAVE_PLAYLIST = gql`
  mutation($id: Int, $name: String, $songs: [Int]) {
    savePlaylist(id: $id, name: $name, songs: $songs) {
      id,
      name,
      songs
    }
  }
`;

export const DELETE_PLAYLIST = gql`
  mutation($id: Int) {
    deletePlaylist(id: $id)
  }
`;

export const GET_PLAYLISTS = gql`
  {
    playlists {
      id,
      name,
      songs
    }
  }
`;

export const GET_PLAYLIST = gql`
  query($id: Int){
    playlist(id: $id){
      songs
    }
  }
`;
