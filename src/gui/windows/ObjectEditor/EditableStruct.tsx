import { Stack, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import CollapsableProperty from "./CollapsableProperty";

interface IEditableColorProps {
  name: string,
  label: string,
  onUpdate: any,
  data: {}
}

export default function EditableStruct(props: IEditableColorProps) {
  const updateData = (state: {}, event: any) => {
    // event.preventDefault();
    const result = {
      ...state,
      [event.target.name]: event.target.value
    }
    setShouldUpdate(true);
    return result;
  }

  useEffect(() => {
    if (shouldUpdate) {
      setShouldUpdate(false);
      props.onUpdate({ target: { name: props.name, value: data } })
    }
  })

  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [data, setData] = useReducer(updateData, props.data);

  return (
    <CollapsableProperty name={props.label}>
      <Stack direction="column" spacing={2}>
        {Object.entries(data).map(([k, v]) => {
          return (
            <TextField variant="standard" key={uuidv4()} label={`${k}`} name={`${k}`} onChange={setData} defaultValue={v} />
          )
        })}
      </Stack>
    </CollapsableProperty>
  )
}