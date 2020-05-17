import React from 'react';
import { useStore } from '../../store';

const FooterLeftPane = () => {
    const { state: { play: { song = {} } } } = useStore();
    const { title, artist } = song;

    return (
        <div className="footerLeftPane padAround">
            <div className="songTitle">
                {title}
            </div>
            <div className="songArtist">
                {artist}
            </div>
        </div>
    );
};

export default FooterLeftPane;
