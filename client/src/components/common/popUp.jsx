import React from 'react';
import { useStore } from '../../store';

const PopUp = () => {
    const { state: { popup: { show = false, component: Component } } } = useStore();

    return (
        show ? (
            <div className="popUp">
                {Component}
            </div>
        ) : null
    );
};

export default PopUp;
