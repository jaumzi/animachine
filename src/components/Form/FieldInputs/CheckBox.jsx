import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import {
    FormHelperText,
    FormControlLabel,
    Checkbox
} from '@material-ui/core';

function CheckBoxComponent(props) {
    const { name, label, noMargin = false, ...rest } = props;
    const inputRef = useRef(null);
    const {
        fieldName,
        registerField,
        error
    } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current.getElementsByTagName('input')[0],
            path: 'checked',
            getValue: ref => ref.checked
        });
    }, [fieldName, registerField]);

    return (
        <div
            style={{ marginBottom: noMargin ? 0 : 12, width: '100%' }}
        >
            <FormControlLabel
                style={{ width: '100%' }}
                size="small"
                control={
                    <Checkbox
                        ref={inputRef}
                        color="primary"
                        {...rest}
                    />
                }
                label={label}
            />
            {error && (
                <FormHelperText error={!!error} >
                    {error}
                </FormHelperText>
            )}
        </div>
    );
}

export { CheckBoxComponent };
