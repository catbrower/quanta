import { Stack, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import CollapsableProperty from "./CollapsableProperty";
import { IProgramEventStep } from "../../../program/ProgramInterfaces";

interface IEditableColorProps {
  name: string,
  label: string,
  onUpdate: any,
  data: IProgramEventStep
}

// TODO change the random uuid to a unique but static value. Hopefully this will help with focus like it did elsewhere
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

  // useEffect(() => {
  //   if (shouldUpdate) {
  //     setShouldUpdate(false);
  //     props.onUpdate({ target: { name: props.name, value: data } })
  //   }
  // })

  const bubbleUpdate = () => {
    console.log('bubble')
    props.onUpdate({ target: { name: props.name, value: data } })
  }

  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [data, setData] = useReducer(updateData, props.data.content);

  return (
    <CollapsableProperty id={props.data.id} name={props.label}>
      <Stack direction="column" spacing={2}>
        {Object.entries(data).map(([k, v]) => {
          return (
            <TextField variant="standard" key={uuidv4()} label={`${k}`} name={`${k}`} onChange={setData} onBlur={bubbleUpdate} defaultValue={v} />
          )
        })}
      </Stack>
    </CollapsableProperty>
  )
}