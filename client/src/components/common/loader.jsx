import React from 'react';
import { getImage } from './icon';
import { LOADER_TEXT } from '../../constant/text';
import { LOADER_IMAGE } from '../../constant/icon';

const Loader = () => {
    return (
        <div className="loader">
            {getImage(LOADER_IMAGE, LOADER_TEXT)}
        </div>
    );
};

export default Loader;
