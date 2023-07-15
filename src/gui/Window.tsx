import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from "@mui/material";
import React from "react";
import Draggable from "react-draggable";
import { IWindow } from "./GUITypes";
import { useAppDispatch } from "../Hooks";
import { closeObjectWindow } from "./GUISlice";
import ObjectEditor from "./windows/ObjectEditor";

interface IProps {};
interface IState {
    isOpen: boolean
};

export class PaperComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <Draggable
                handle="#draggable-dialog-title"
                cancel={'[class*="MuiDialogContent-root"]'}
            >
                <Paper {...this.props} />
            </Draggable>
        )
    }
}

export default function Window(props: IWindow) {
  const dispatch = useAppDispatch();
  const window = props;

  function handleClose(event: any, reason: any) {
    if(reason && reason == "backdropClick") {
      return;
    }

    dispatch(closeObjectWindow(window.id));
  }

  function getDialogContent() {
    if(window.type === "object") {
      return (<ObjectEditor {...window.data} />)
    } else {
      return (<Typography>Unimplemented</Typography>)
    }
  }

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        hideBackdrop={true}
        disableEnforceFocus={true}
        
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {window.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {getDialogContent()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => {handleClose(null, "closeBtn")}}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}