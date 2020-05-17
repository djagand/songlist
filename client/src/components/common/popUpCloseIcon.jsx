import React, { useCallback } from 'react';
import { useStore } from '../../store';
import { CLOSE_POP_UP } from '../../constant/action';
import { CloseIcon } from './icon';

const PopUpCloseIcon = props => {
    const { blur = false } = props;
    const { dispatch } = useStore();
    const closePopUp = useCallback(payload => dispatch({ type: CLOSE_POP_UP, payload }), [dispatch]);

    return (
        <div className="popUpCloseIcon">
            <CloseIcon
                className={`closeIcon-popup`}
                onClick={!blur ? () => closePopUp() : () => { }}
                disabled={blur}
            />
        </div>
    );
};

export default PopUpCloseIcon;
