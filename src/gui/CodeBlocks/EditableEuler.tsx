import React from "react";
import { IProgramEuler } from "../../Program";
import { Typography } from "@mui/material";

interface IProps {
    name: string,
    field: IProgramEuler
}

interface IState {
    x: string,
    y: string,
    z: string
}

export default class EditableEuler extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = props.field;
    }
    render() {
        return (<>
            <Typography>{this.props.name}</Typography>
        </>)
    }
}