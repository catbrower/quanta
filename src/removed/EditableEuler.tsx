import { Stack, TextField, capitalize } from "@mui/material";
import { IProgramEuler } from "../program/ProgramInterfaces";
import CollapsableProperty from "../gui/windows/ObjectEditor/CollapsableProperty";
import { OBJECT_JSON_PATH_SEPERATOR, lastItem } from "../Common";

interface IEditableEulerProps {
  name: string,
  onUpdate: any,
  data: IProgramEuler
}

export default function EditableEuler(props: IEditableEulerProps) {
  return (
    <CollapsableProperty id="" name={`Set ${capitalize(lastItem(props.name.split(OBJECT_JSON_PATH_SEPERATOR)))}`}>
      <Stack direction="column" spacing={2}>
        <TextField variant="standard" id={`${props.name}_x`} label="X" defaultValue={props.data.x} />
        <TextField variant="standard" id={`${props.name}_y`} label="Y" defaultValue={props.data.y} />
        <TextField variant="standard" id={`${props.name}_z`} label="Z" defaultValue={props.data.z} />
      </Stack>
    </CollapsableProperty>
  )
}