import React, { useCallback } from 'react';
import { useStore } from '../../store';
import { WARNING, EMPTY_STRING } from '../../constant/text';
import { CLEAR_MESSAGE } from '../../constant/action';
import { CloseIcon } from './icon';

const Message = () => {
    const { dispatch, state: { message: { show = false, status = WARNING, value = EMPTY_STRING } } } = useStore();

    const clearMessage = useCallback(payload => dispatch({ type: CLEAR_MESSAGE, payload }), [dispatch]);

    return (
        show ? (
            <div className={`globalMessage ${status}`}>
                <CloseIcon className="closeIcon" onClick={() => clearMessage()} />
                {value}
            </div>
        ) : null
    );
};

export default Message;
