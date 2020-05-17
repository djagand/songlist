import React, { useState, useCallback, useEffect } from 'react';
import Checkbox from '../../common/checkbox';
import isEmpty from 'lodash/isEmpty';
import { Link } from '../../common/text';
import Filter from '../../common/filter';
import ToolTip from '../../common/toolTip';
import LibraryFilter from './libraryFilter';
import { filterSongsByText, filterSongsByField } from '../../util';
import AddToPlaylist from './addToPlaylist';
import { OPEN_POP_UP, PLAY, PAUSE } from '../../../constant/action';
import { Button } from '../../common/text';
import { PlayIcon, PauseIcon } from '../../common/icon';
import { useStore } from '../../../store';
import { LIBRARY, PLAYLIST_DETAIL, EMPTY_STRING, SONGS_MAX_LENGTH_DISPLAY } from '../../../constant/text';

const Songs = (props) => {
    const { songs: inputSongs = [], removeSongs, searchText = EMPTY_STRING } = props;
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [showSelectAll, setShowSelectAll] = useState(isEmpty(selectedSongs));
    const [songs, setSongs] = useState(inputSongs);
    const { dispatch, state: { loaded = LIBRARY, play: { song: playingSong = {}, paused = true } } } = useStore();
    const openPopUp = useCallback(payload => dispatch({ type: OPEN_POP_UP, payload }), [dispatch]);
    const play = useCallback(payload => dispatch({ type: PLAY, payload }), [dispatch]);
    const pause = useCallback(payload => dispatch({ type: PAUSE, payload }), [dispatch]);

    useEffect(() => {
        setSongs(inputSongs);
        clearAll();
    }, [inputSongs]);

    const selectSong = songId => {
        const index = selectedSongs.indexOf(songId);
        if (index > -1) {
            let newSongList = selectedSongs.filter(itemId => itemId !== songId);
            setSelectedSongs(newSongList);
        } else {
            setSelectedSongs([...selectedSongs, songId]);
        }
    };

    const selectAll = () => {
        setShowSelectAll(false);
        const songIds = songs.map(song => song.id);
        setSelectedSongs(songIds);
    };

    const clearAll = () => {
        setShowSelectAll(true);
        setSelectedSongs([]);
    };

    const onFilterTextChange = filterText => {
        setSongs(filterSongsByText(inputSongs, filterText));
    };

    const searchBy = field => {
        setSongs(filterSongsByField(inputSongs, searchText, field));
    };

    const addToPlaylist = () => {
        openPopUp({ component: <AddToPlaylist selectedSongs={selectedSongs} setSelectedSongs={setSelectedSongs} /> });
    };

    return (
        <div className="songs">
            <div className="addOrRemoveButton">
                <div className="filterContainer">
                    {loaded === LIBRARY && !isEmpty(searchText) && <LibraryFilter searchBy={searchBy} />}
                    {loaded === PLAYLIST_DETAIL && <Filter onChange={onFilterTextChange} />}
                </div>
                <div className="buttonContainer">
                    {!isEmpty(selectedSongs) && loaded === LIBRARY && <Button onClick={addToPlaylist} value="Add to playlist" />}
                    {!isEmpty(selectedSongs) && loaded === PLAYLIST_DETAIL && <Button onClick={() => removeSongs(selectedSongs)} value="Remove from playlist" />}
                </div>
            </div>
            <div className="table">
                <div className="tableHead">
                    <div className="tableRow">
                        <div className="cell-10">
                            {showSelectAll && <Link value="Select All" onClick={selectAll} />}
                            {!showSelectAll && <Link value="Clear All" onClick={clearAll} />}
                        </div>
                        <div className="cell-10"></div>
                        <div className="cell-30">TITLE</div>
                        <div className="cell-20">ARTIST</div>
                        <div className="cell-20">ALBUM</div>
                        <div className="cell-10">TIME</div>
                    </div>
                </div>
                <div className="tableBody scroll">
                    {
                        !isEmpty(songs) && songs.map(song => {
                            const { id: songId, title: songTitle, artist, album, duration } = song;

                            return (
                                <div key={songId} className={`song tableRow ${playingSong.id === song.id ? 'activeRow' : EMPTY_STRING}`}>
                                    <div className="cell-10">
                                        <Checkbox
                                            onChange={() => selectSong(Number(songId))}
                                            checked={selectedSongs.indexOf(songId) > -1 ? true : false}
                                        />
                                    </div>
                                    <div className="cell-10">
                                        {(paused || playingSong.id !== song.id) && <PlayIcon onClick={() => play(song)} />}
                                        {playingSong.id === song.id && !paused && <PauseIcon onClick={() => pause(song)} />}
                                    </div>
                                    <div className="cell-30"><ToolTip value={songTitle} maxLength={SONGS_MAX_LENGTH_DISPLAY} /></div>
                                    <div className="cell-20"><ToolTip value={artist} maxLength={SONGS_MAX_LENGTH_DISPLAY} /></div>
                                    <div className="cell-20"><ToolTip value={album} maxLength={SONGS_MAX_LENGTH_DISPLAY} /></div>
                                    <div className="cell-10">{duration}</div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Songs;
