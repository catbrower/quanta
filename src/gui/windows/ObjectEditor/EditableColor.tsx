import { Stack, TextField } from "@mui/material";
import { useReducer } from "react";
import { IProgramColor } from "../../../program/Interfaces";
import CollapsableProperty from "./CollapsableProperty";
import { OBJECT_JSON_PATH_SEPERATOR } from "../../../Common";

interface IEditableColorProps {
  name: string,
  onUpdate: any,
  data: IProgramColor
}

export default function EditableColor(props: IEditableColorProps) {
  return (
    <CollapsableProperty name={props.name}>
      <Stack direction="column" spacing={2}>
        <TextField variant="standard" id="color_r" label="R" name={`${props.name}${OBJECT_JSON_PATH_SEPERATOR}r`} onChange={props.onUpdate} defaultValue={props.data.r} />
        <TextField variant="standard" id="color_g" label="G" name={`${props.name}${OBJECT_JSON_PATH_SEPERATOR}g`} onChange={props.onUpdate} defaultValue={props.data.g} />
        <TextField variant="standard" id="color_b" label="B" name={`${props.name}${OBJECT_JSON_PATH_SEPERATOR}b`} onChange={props.onUpdate} defaultValue={props.data.b} />
        <TextField variant="standard" id="color_a" label="A" name={`${props.name}${OBJECT_JSON_PATH_SEPERATOR}a`} onChange={props.onUpdate} defaultValue={props.data.a} />
      </Stack>
    </CollapsableProperty>
  )
}