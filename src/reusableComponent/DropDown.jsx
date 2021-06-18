import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';



export default function SimpleSelect(props) {


    return (
            <TextField
                select
                label={props.label}
                error={props.touched && props.error ? true : false}
                helperText={props.touched && props.error  ? props.error : ""}
                variant="outlined"
                color={props.color}
                onChange={props.onChange}
                value={props.values}
                name={props.name}
                onBlur={props.onBlur}
                size="small"
                style={{width:props.width,height:"200",backgroundColor:"white"}}

            >
               {
                props.data.map((element)=><MenuItem key={element} value={element}>{element}</MenuItem>)

               }
            </TextField>
    );
}
