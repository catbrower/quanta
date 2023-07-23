import { Stack, TextField } from "@mui/material";
import { IProgramEuler } from "../../../program/Interfaces";
import CollapsableProperty from "./CollapsableProperty";

interface IEditableEulerProps {
  name: string,
  onUpdate: any,
  data: IProgramEuler
}

export default function EditableEuler(props: IEditableEulerProps) {
  return (
    <CollapsableProperty name={props.name}>
      <Stack direction="column" spacing={2}>
        <TextField variant="standard" id={`${props.name}_x`} label="X" defaultValue={props.data.x} />
        <TextField variant="standard" id={`${props.name}_y`} label="Y" defaultValue={props.data.y} />
        <TextField variant="standard" id={`${props.name}_z`} label="Z" defaultValue={props.data.z} />
      </Stack>
    </CollapsableProperty>
  )
}