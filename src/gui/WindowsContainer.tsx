import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { Container } from "@mui/material";

export default function WindowsContainer() {
    // const windows = useAppSelector(state => state.windows);
    const windows: any[] = [];
    const dispatch = useAppDispatch();

    if(windows) {
        return (
            <Container style={{position: "absolute", bottom: "0px", height: "25px"}}>
                {windows.map(() => (
                    <Container sx={{width: "10px"}}>window</Container>
                ))}
            </Container>
        )
    } else {
        return (<></>)
    }
    
}