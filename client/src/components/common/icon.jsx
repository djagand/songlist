import React from 'react';
import { EMPTY_STRING } from '../../constant/text';
import {
    CLOSE_ICON, ADD_ICON, DEFAULT_SVG_SIZE, SEARCH_ICON, MORE_ICON, PLAY_ICON, PAUSE_ICON
} from '../../constant/icon';

export const getImage = (src, alt) => {
    return <img src={src} alt={alt} />;
};

const getSvg = props => {
    const { d1 = EMPTY_STRING, d2 = 'M0 0h24v24H0z', viewBox = DEFAULT_SVG_SIZE, width = DEFAULT_SVG_SIZE, fillClassName = 'none', className = EMPTY_STRING, onClick = () => { }, icon = null, disabled = false } = props;
    let svgIcon;
    if (icon) {
        svgIcon = icon;
    } else {
        svgIcon = (
            <svg height={width} className={fillClassName} viewBox={`0 0 ${viewBox} ${viewBox}`} width={width}>
                <path d={d1} />
                <path d={d2} fill="none" />
            </svg>
        );
    }

    const disabledClass = disabled ? 'disabledBtn' : 'clickable';

    return (
        <div className={`icon ${className} ${disabledClass}`} onClick={disabled ? () => { } : () => onClick()}>
            {svgIcon}
        </div>
    );
};

export const MoreIcon = props => {
    return getSvg({ d1: MORE_ICON, ...props });
};

export const CloseIcon = props => {
    return getSvg({ d1: CLOSE_ICON, ...props });
};

export const AddIcon = props => {
    return getSvg({ d1: ADD_ICON, ...props });
};

export const SearchIcon = props => {
    return getSvg({ d1: SEARCH_ICON, ...props });
};

export const PlayIcon = props => {
    return getSvg({ d1: PLAY_ICON, ...props });
};

export const PauseIcon = props => {
    return getSvg({ d1: PAUSE_ICON, ...props });
};
