import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { maxWordLength } from '../util';
import { EMPTY_STRING } from '../../constant/text';

const ToolTip = props => {
    const { value = EMPTY_STRING, maxLength = 0, toolTipText = EMPTY_STRING } = props;

    return (
        <div className="toolTip">
            {maxLength !== 0 && value.length > maxLength ? maxWordLength(value, maxLength) : value}
            {isEmpty(toolTipText) && value.length > maxLength && <span className="toolTipFullText">{value}</span>}
            {!isEmpty(toolTipText) && <span className="toolTipFullText">{toolTipText}</span>}
        </div>
    );
};

export default ToolTip;
