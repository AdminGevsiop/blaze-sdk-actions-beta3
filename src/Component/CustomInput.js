import React, { useState } from 'react'
import { Grid, MenuItem, Select } from '@material-ui/core'

export const CustomInput = (props) => {

    const [value, setValue] = useState(null);

    const handleSelectChange = ({ target }) => {
        setValue(target.value);
        props.onSetInputValues({
            key: props.inputKey,
            [props.valueType]: target.value
        })
    }


    return (
        <div>
            {
                props.field == "Select" && (
                    <Grid item xs={12} className="select">
                        <Select
                            id="demo-customized-select"
                            labelId="demo-customized-select-label"
                            value={value}
                            onChange={handleSelectChange}
                            style={{width:"100%"}}
                        >
                            {props.options.map((option) => (
                                <MenuItem value={option.id}>{option.name}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                )
            }
        </div>
    )
}
