import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, TextField, Typography } from "@mui/material";
import { IProgramEuler, IProgramObject } from "../../code/Program";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function editableEuler(props: IProgramEuler | undefined, name: string) {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>Set {name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack direction="column" spacing={2}>
                    <TextField id={`${name}_x`} label="X" defaultValue={props?.x}/>
                    <TextField id={`${name}_y`} label="Y" defaultValue={props?.y}/>
                    <TextField id={`${name}_z`} label="Z" defaultValue={props?.z}/>
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}

export default function ObjectEditor(props: IProgramObject) {
    // const objectData = findObjectById(props.id);

    return (
        <Stack direction="column" spacing={3} py={1}>
            <TextField id="name" label="Name" defaultValue={props.name}/>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>Set Color</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack direction="column" spacing={2}>
                        <TextField id="color_r" label="R" defaultValue={props.color?.r}/>
                        <TextField id="color_g" label="G" defaultValue={props.color?.g}/>
                        <TextField id="color_b" label="B" defaultValue={props.color?.b}/>
                        <TextField id="color_a" label="A" defaultValue={props.color?.a}/>
                    </Stack>
                </AccordionDetails>
            </Accordion>

            {editableEuler(props.rotation, "rotation")}
            {editableEuler(props.translation, "translation")}
            {editableEuler(props.scale, "scale")}

        </Stack>
    )
}