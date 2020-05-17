import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { EMPTY_STRING, WARNING, REQUIRED_FIELD } from '../../constant/text';
import { Label, FieldErrorText } from './text';

const TextField = props => {
    const { required = false, errorType = WARNING, errorMessage = EMPTY_STRING, label = EMPTY_STRING, onChange, id, value, placeholder = EMPTY_STRING, className = EMPTY_STRING, type = 'text', onKeyPress = () => { }, disabled = false } = props;
    const [error, setError] = useState(errorMessage);

    useEffect(() => {
        setError(errorMessage);
    }, [errorMessage]);

    const onTextFieldChange = val => {
        onChange(val);
        if (required && isEmpty(val)) {
            setError(REQUIRED_FIELD);
        } else {
            setError(EMPTY_STRING);
        }
    };

    return (
        <div className="labelAndField">
            <Label value={label} required={required} />
            <input
                type={type}
                id={id}
                className={`textField ${className}`}
                value={value ? value : EMPTY_STRING}
                placeholder={placeholder}
                onChange={e => onTextFieldChange(e.target.value)}
                disabled={disabled}
                autoComplete="off"
                onKeyPress={e => onKeyPress(e)}
            />
            <FieldErrorText value={error} type={errorType} />
        </div>

    );
};

export default TextField;
