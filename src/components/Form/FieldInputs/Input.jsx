import React, { useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import {
  FormControl,
  OutlinedInput,
  IconButton,
  InputLabel,
  InputAdornment,
  FormHelperText
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

function InputComponent(props) {
  const { name, label, type = 'text', multiline, noMargin = false, ...rest } = props;

  const [state, setState] = useState({
    showPassword: false
  });
  const { showPassword } = state;

  const inputRef = useRef(null);
  const {
    fieldName,
    defaultValue = type === 'number' ? 0 : undefined,
    registerField,
    error
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current.getElementsByTagName(multiline ? 'textarea' : 'input')[0],
      path: 'value'
    });
  }, [fieldName, multiline, registerField]);

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  let passwordProps = {};
  if (type === 'password') {
    passwordProps = {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      ),
      labelWidth: 70
    };
  }

  return (
    <FormControl
      variant="outlined"
      error={!!error}
      fullWidth
      style={{ marginBottom: noMargin ? 0 : 12 }}
      size="small"
    >
      <InputLabel htmlFor={`outlined-adornment-${fieldName}`}>
        {label}
      </InputLabel>
      <OutlinedInput
        defaultValue={defaultValue}
        multiline={multiline}
        {...rest}
        {...passwordProps}
        ref={inputRef}
        variant="outlined"
        label={label}
        // error={!!error}
        // helperText={error}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
      />
      {error && (
        <FormHelperText id={`component-error-text-${fieldName}`}>
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export { InputComponent };
