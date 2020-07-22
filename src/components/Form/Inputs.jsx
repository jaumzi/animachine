import { memo } from 'react';

import { InputComponent } from 'components/Form/FieldInputs/Input';
import { CheckBoxComponent } from './FieldInputs/CheckBox';
// import { DatePickerComponent } from 'components/Form/FieldInputs/DatePicker';
// import {
//   SelectComponent,
//   AsyncSelectComponent
// } from 'components/Form/FieldInputs/Select';

const Input = memo(InputComponent);
const CheckBox = memo(CheckBoxComponent);
// const Select = memo(SelectComponent);
// const AsyncSelect = memo(AsyncSelectComponent);
// const DatePicker = memo(DatePickerComponent);

export {
  Input,
  CheckBox,
  // AsyncSelect, Select, DatePicker
};
