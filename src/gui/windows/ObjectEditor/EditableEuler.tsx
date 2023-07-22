import { Accordion, AccordionDetails, AccordionSummary, Stack, TextField, Typography } from "@mui/material";

import { IProgramEuler } from "../../../program/Interfaces";
import CollapsableProperty from "./CollapsableProperty";

interface IEditableEulerProps extends IProgramEuler {
    name: string
}

export default function EditableEuler(props: IEditableEulerProps) {
    return (
        <CollapsableProperty name={props.name}>
            <Stack direction="column" spacing={2}>
                <TextField variant="standard" id={`${props.name}_x`} label="X" defaultValue={props?.x}/>
                <TextField variant="standard" id={`${props.name}_y`} label="Y" defaultValue={props?.y}/>
                <TextField variant="standard" id={`${props.name}_z`} label="Z" defaultValue={props?.z}/>
            </Stack>
        </CollapsableProperty>
    )
}