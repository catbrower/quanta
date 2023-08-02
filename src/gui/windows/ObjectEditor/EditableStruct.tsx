import { Stack, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { IProgramEventStep } from "../../../program/ProgramInterfaces";
import CollapsableProperty from "./CollapsableProperty";

interface IEditableColorProps {
  name: string,
  label: string,
  onUpdate: any,
  onDelete: any,
  data: IProgramEventStep
}

export default function EditableStruct(props: IEditableColorProps) {
  const [canUpdate, setCanUpdate] = useState(false);

  const updateData = (state: {}, event: any) => {
    const result = {
      ...state,
      [event.target.name]: event.target.value
    }
    setCanUpdate(true);
    return result;
  }

  useEffect(() => {
    if (canUpdate) {
      setCanUpdate(false);
      props.onUpdate({ target: { name: props.name, value: data } });
    }
  });

  const [data, setData] = useReducer(updateData, props.data.content);

  return (
    <CollapsableProperty id={props.data.id} name={props.label}>
      <Stack direction="column" spacing={2}>
        {Object.entries(data).map(([k, v]) => {
          return (
            // onChange = { setData }
            <TextField variant="standard" key={uuidv4()} label={`${k}`} name={`${k}`} onBlur={setData} defaultValue={v} />
          )
        })}
      </Stack>
    </CollapsableProperty>
  )
}