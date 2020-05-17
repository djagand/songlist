import React, { useCallback } from 'react';
import isEmpty from 'lodash/isEmpty';
import { PlayIcon, PauseIcon } from '../common/icon';
import { PLAY, PAUSE } from '../../constant/action';
import { useStore } from '../../store';

const FooterCenterPane = () => {
    const { dispatch, state: { play: { song = {}, paused = true } } } = useStore();

    const play = useCallback(payload => dispatch({ type: PLAY, payload }), [dispatch]);
    const pause = useCallback(payload => dispatch({ type: PAUSE, payload }), [dispatch]);

    return (
        <div className="footerCenterPane padAround">
            {!isEmpty(song) && paused && <PlayIcon onClick={() => play(song)} width={50} />}
            {!isEmpty(song) && !paused && <PauseIcon onClick={() => pause(song)} width={50} />}
        </div>
    );
};

export default FooterCenterPane;
