import React from 'react';
import isEmpty from 'lodash/isEmpty';

const ActionPane = props => {
    const { actions = [], setShowActionPane } = props;

    const onOutsideClick = (target) => {
        var bgOverlayElement = document.getElementById('backgroundOverlay');
        var actionPaneElement = document.getElementById('actionPane');
        if (target.id === 'backgroundOverlay') {
            actionPaneElement.style.display = 'none';
            bgOverlayElement.style.display = 'none';
            setShowActionPane(false);
        } else {
            actionPaneElement.style.display = 'block';
            bgOverlayElement.style.display = 'block';
            setShowActionPane(true);
        }
    };

    return (
        <div className="pane">
            <div id="actionPane" className="actionPane">
                {!isEmpty(actions) && actions.map(action => {
                    const { label, onClick } = action;

                    return (
                        <div key={label} className="action" onClick={() => onClick()}>{label}</div>
                    );
                })}
            </div>
            <div id="backgroundOverlay" className="backgroundOverlay" onClick={(e) => onOutsideClick(e.target)}></div>
        </div>
    )
};

export default ActionPane;
