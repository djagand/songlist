import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { EMPTY_STRING } from '../../constant/text';

export const Label = props => {
    const { value = EMPTY_STRING, className = EMPTY_STRING, required = false, size = 's' } = props;

    if (!isEmpty(value)) {
        return <div className={`label ${size} ${className}`}>{`${value} ${required ? '*' : EMPTY_STRING}:`}</div>;
    }

    return null;
};

export const Button = props => {
    const { value, className = EMPTY_STRING, onClick = () => { }, disabled = false } = props;

    return (
        <div className={`button ${disabled ? 'disabledBtn' : 'clickable'} ${className}`} onClick={disabled ? () => { } : () => onClick()}>
            {value}
        </div>
    );
};

export const Link = props => {
    const { value, className = EMPTY_STRING, onClick = () => { } } = props;

    return (
        <div className={`link clickable ${className}`} onClick={() => onClick()}>
            {value}
        </div>
    );
};

export const TextValue = props => {
    const { value, className = EMPTY_STRING } = props;

    return (
        <div className={`textValue ${className}`}>{value}</div>
    );
};

export const FieldErrorText = props => {
    const { value, type = EMPTY_STRING } = props;

    if (!isEmpty(value)) {
        return (
            <div className={`fieldInfo ${type}`}>{value}</div>
        );
    }

    return null;
};

export const Title = props => {
    const { value, className = EMPTY_STRING, size = 's' } = props;

    if (!isEmpty(value)) {
        return (
            <div className={`title ${size} ${className}`}>{value}</div>
        );
    }

    return null;
};

export const LabelText = props => {
    const { label = EMPTY_STRING, text = EMPTY_STRING, className = EMPTY_STRING } = props;

    return (
        <div className={`labelAndText ${className}`}>
            <Label value={`${label}:`} />
            <TextValue value={text} />
        </div>
    );
};
