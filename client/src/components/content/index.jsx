import React from 'react';
import LeftPane from './leftPane';
import CenterPane from './centerPane';
import RightPane from './rightPane';

const Content = () => {
    return (
        <div className="content padAround">
            <LeftPane />
            <CenterPane />
            <RightPane />
        </div>
    );
}

export default Content;
