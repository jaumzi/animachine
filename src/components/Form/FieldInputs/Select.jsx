import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import ReactSelect from 'react-select/async';
import {
  FormControl,
  InputLabel,
  FormHelperText
} from '@material-ui/core';

const customStyles = {
  control: (provided, state) => {
    return {
      ...provided,
      borderColor: state.selectProps.error
        ? state.isFocused
          ? 'red !important'
          : '#c3c3c3 !important'
        : '#c3c3c3',
      boxShadow: 'none !important'
    };
  }
};

const AsyncSelectComponent = props => {
  const { name, label, array, itemConvert, ...rest } = props;
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: ref => {
        console.log(ref);
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(option => option.value);
        } else {
          if (!ref.select.state.value) {
            return '';
          }
          return ref.select.state.value.value;
        }
      }
    });
  }, [fieldName, registerField, rest.isMulti]);

  const data = [];
  array && array.map(element => data.push(itemConvert(element)));

  console.log(selectRef);

  return (
    <>
      <InputLabel htmlFor={`react-select-label-${fieldName}`}>
        {label}
      </InputLabel>
      <ReactSelect
        cacheOptions
        {...rest}
        defaultValue={defaultValue}
        value={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        loadingMessage={() => 'Carregando dados'}
        noOptionsMessage={() => 'Nenhum dado encontrado!'}
        placeholder={label}
        styles={customStyles}
        error={!!error}
        options={data}
        defaultOptions={data}
        fullWidth
      />
      {error && (
        <FormHelperText id={`react-select-error-text-${fieldName}`}>
          {error}
        </FormHelperText>
      )}
    </>
  );
};

const SelectComponent = props => {
  const { name, label, array, itemConvert, ...rest } = props;

  const selectRef = useRef(null);
  const { fieldName, defaultValue = 0, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value',
      getValue: ref => {
        console.log(ref);
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(option => option.value);
        } else {
          if (!ref.select.state.value) {
            return '';
          }
          console.log(ref.select.state.value);
          return ref.select.state.value;
        }
      }
    });
  }, [fieldName, registerField, rest.isMulti]);

  const data = [];
  array && array.map(element => data.push(itemConvert(element)));

  return (
    <div style={{ marginBottom: 12 }}>
      <InputLabel
        htmlFor={`react-select-label-${fieldName}`}
        style={{
          marginBottom: '4px',
          fontWeight: 'bold'
        }}
      >
        {`Selecione ${label}`}
      </InputLabel>
      <ReactSelect
        defaultValue={defaultValue}
        options={data}
        defaultOptions={data}
        {...rest}
        ref={selectRef}
        classNamePrefix="react-select"
        loadingMessage={() => 'Carregando dados'}
        noOptionsMessage={() => 'Nenhum dado encontrado!'}
        placeholder={label}
        styles={customStyles}
        error={!!error}
        onChange={e => {
          console.log(e, selectRef);
          selectRef.current.select.state.value = e;
        }}
        fullWidth
      />
      {!!error && (
        <FormControl error={!!error} size="small">
          <FormHelperText
            id={`react-select-error-text-${fieldName}`}
            className="MuiFormHelperText-contained"
          >
            {error}
          </FormHelperText>
        </FormControl>
      )}
    </div>
  );
};

export { SelectComponent, AsyncSelectComponent };
