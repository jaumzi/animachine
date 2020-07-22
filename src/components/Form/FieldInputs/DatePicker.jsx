import React, { useRef, forwardRef, useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  FormHelperText
} from '@material-ui/core';
import { useField } from '@unform/core';
import 'react-datepicker/dist/react-datepicker.css';

const CustomInput = forwardRef(
  ({ label, fieldName, defaultValue, error, ...restInput }, datepickerRef) => {
    console.log(restInput );
    return (
      <>
        <InputLabel htmlFor={`datepicker-adornment-${fieldName}`}>
          {label}
        </InputLabel>
        <OutlinedInput
          ref={datepickerRef}
          {...restInput}
          // defaultValue={defaultValue}
          variant="outlined"
          label={fieldName}
          // error={!!error}
          // helperText={error}
          fullWidth
        />
        {error && (
          <FormHelperText id={`datepicker-error-text-${fieldName}`}>
            {error}
          </FormHelperText>
        )}
      </>
    );
  }
);

const DatePickerComponent = props => {
  const { name, label, type = 'date', ...rest } = props;

  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: ref => {
        ref.clear();
      }
    });
  }, [fieldName, registerField]);

  return (
    <FormControl
      variant="outlined"
      error={!!error}
      fullWidth
      style={{ marginBottom: 12 }}
      size="small"
    >
      <ReactDatePicker
        ref={datepickerRef}
        selected={date}
        onChange={setDate}
        {...rest}
        dateFormat={type === 'dateTime' ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy'}
   
        customInput={
          <CustomInput
            {...{ label, fieldName, defaultValue, error }}
            ref={datepickerRef}
          />
        }
      />
    </FormControl>
  );
};

export { DatePickerComponent };
