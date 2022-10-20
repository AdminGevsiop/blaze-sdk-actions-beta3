import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';

const FormSelect = ({
  selectLabel,
  menuList = [],
  selectPlaceholder,
  name,
  id,
  helperText,
  error,
  onChange,
  onBlur,
  value,
  inputProps,
  disabled,
  margin,
}) => {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl
      variant="outlined"
      fullWidth
      margin={margin ? margin : 'normal'}
      error={error}
      disabled={disabled}
    >
      <InputLabel ref={inputLabel} shrink>
        {selectLabel}
      </InputLabel>
      <Select
        displayEmpty
        value={value ? value : ''}
        labelWidth={labelWidth}
        onChange={onChange}
        onBlur={onBlur}
        input={
          <OutlinedInput
            notched
            labelWidth={labelWidth}
            name={name}
            id={id}
            {...inputProps}
          />
        }
      >
        {selectPlaceholder && <MenuItem value="">{selectPlaceholder}</MenuItem>}
        {menuList.map((item, index) => (
          <MenuItem key={index} value={item.id} disabled={item.disabled ? item.disabled : false}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default FormSelect;
