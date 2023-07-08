import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Card, Stack, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ObjectSpec } from "../../Program";
import EditableEuler from "./EditableEuler";

interface IProps {
    code: ObjectSpec
}

interface IState {
    code: ObjectSpec
}

export default class CodeBlock extends React.Component<IProps, IState> {
    private static colorFields: string[] = ["r", "g", "b", "a"];
    private static eulerFields: string[] = ["x", "y", "z"];
    
    constructor(props: IProps) {
        super(props);

        this.state = {
            code: props.code
        }
    }

    positionEditor() {
        if(this.state.code.translation) {
            return (
                <EditableEuler name="Position" field={this.state.code.translation}></EditableEuler>
            )
        } else {
            return (<Typography>Position +</Typography>)
        }
    }

    rotationEditor() {
        if(this.state.code.rotation) {
            return (
                <EditableEuler name="Rotation" field={this.state.code.rotation}></EditableEuler>
            )
        } else {
            return (<Typography>Scale +</Typography>)
        }
    }

    scaleEditor() {
        if(this.state.code.scale) {
            return (
                <EditableEuler name="Scale" field={this.state.code.scale}></EditableEuler>
            )
        } else {
            return (<Typography>Scale +</Typography>)
        }
    }

    render() {

        return (
        <>
            <Accordion sx={{margin: "5px"}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}>
                    <Typography>Create Object: {this.state.code.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack direction="column" spacing={2}>
                        <TextField id="name" label="Name" value={this.state.code.name} variant="standard"/>
                        
                        {this.positionEditor()}
                        {this.rotationEditor()}
                        {this.scaleEditor()}
                    </Stack>
                    
                </AccordionDetails>
            </Accordion>
        </>
        )
    }
}