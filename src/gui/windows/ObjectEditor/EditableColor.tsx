import { Stack, TextField } from "@mui/material";

import { IProgramColor } from "../../../program/Interfaces";
import CollapsableProperty from "./CollapsableProperty";

interface IEditableColorProps extends IProgramColor {
  name: string
}

export default function EditableColor(props: IEditableColorProps) {
  return (
    <CollapsableProperty name={props.name}>
      <Stack direction="column" spacing={2}>
        <TextField variant="standard" id="color_r" label="R" defaultValue={props.r} />
        <TextField variant="standard" id="color_g" label="G" defaultValue={props.g} />
        <TextField variant="standard" id="color_b" label="B" defaultValue={props.b} />
        <TextField variant="standard" id="color_a" label="A" defaultValue={props.a} />
      </Stack>
    </CollapsableProperty>
  )
}