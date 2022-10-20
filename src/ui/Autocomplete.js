import React from 'react';
import {
  TextField,
  Typography,
  Tooltip
} from '@material-ui/core';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { formatErrors } from '../libs/utils';
import { useLazyQuery } from '@apollo/react-hooks';

const AutocompleteUI = props => {
  const [inputValue, setInputValue] = React.useState('');
  const [optionList, setOptionList] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState({});
  const {
    onChange,
    onBlur,
    value,
    id,
    name,
    selectLabel,
    error,
    helperText,
    data,
    datasetQuery,
    disabled,
    showTooltip=false,
    tooltipField="",
    freeSolo = false,//To allow free input
    autoSelect = false//To allow off-Focus select/input (use true when freeSolo)
  } = props;

  if(datasetQuery){
    const [datasetFunc, resDatasetQuery] = useLazyQuery(datasetQuery, {
      fetchPolicy: 'network-only',
      onCompleted: (res) => {
        let result = (props.dataset ? res[props.dataset] : res) || [];
        result = (typeof result.values === "object") ? result.values : result;
        result = _.orderBy(result, [item => item.name.toLowerCase()], ['asc']);
        setOptionList(result);
      },
      onError: error => {
        props.handleError(formatErrors(error), 'error');
      },
    });

    const filterItems = (value = '') => {

      var variables = {};

      if(props.variables){
        variables = props.variables;
      }

      if(props.isSearchable){
        variables.searchTerm=value;
      }

      datasetFunc({
        // fetchPolicy: 'network-only',
        variables: variables
      });
    };
  
    // const bouncedSearch = _.debounce(filterItems, 500);
  
    React.useEffect(() => {
      filterItems(inputValue);
    }, []);
  }

  if(data){
    if(data.length > 0){
      if (_.isEmpty(optionList) || data.length!==optionList.length){
        setOptionList(data);
      }else if (JSON.stringify(data)!==JSON.stringify(optionList)){
        setOptionList(data);
      }
    }
  }

  React.useEffect(() => {
    if (!_.isEmpty(optionList) && value) {
      let item = _.filter(optionList, { "id" : value }).pop();
      if(_.isEmpty(item)) {
        item = _.filter(optionList, { "enum" : value }).pop();
      }
      if (!item && freeSolo){
        item = {name:value};
      }
      setSelectedItem(item);
    } else{
      setSelectedItem({});
    }
  }, [value, optionList]);
  
  const handleInputChange = event => {
    setInputValue(event.target.value);
    // bouncedSearch(event.target.value);
  };

  const renderOption = (render,show,option) => {

    if(show){
      return <Tooltip title={option[tooltipField] ? option[tooltipField] : ""} placement="right">
        {
          render ? (
            <Typography noWrap>{props.renderValueFunction(option)}</Typography>
          ) : ( <Typography noWrap>{option.name}</Typography> )
        }
      </Tooltip> 
    }else{
      return render ? (
        <Typography noWrap>{props.renderValueFunction(option)}</Typography>
      ) : ( <Typography noWrap>{option.name}</Typography> )
    }
  }

  return (
    <React.Fragment>
      <Autocomplete
        freeSolo={freeSolo}
        autoSelect={autoSelect}
        name={name}
        id={id}
        options={optionList}
        getOptionLabel={option => props.renderValueFunction ? props.renderValueFunction(option) : (option.name || "")}
        onChange={onChange}
        value={selectedItem}
        onBlur={onBlur}
        disabled={disabled}
        renderInput={params => (
          <TextField
            {...params}
            fullWidth
            margin={"normal"}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
            label={selectLabel}
            variant="outlined"
            error={error}
            helperText={helperText}
          />
        )}
        renderOption={
          (option) => ( renderOption(props.renderValueFunction,showTooltip,option) )
        }
      />
    </React.Fragment>
  );
};

export default AutocompleteUI;
