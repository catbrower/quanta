import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grow, IconButton, Paper, Slide, Typography } from "@mui/material";
import React from "react";
import Draggable from "react-draggable";
import { IWindow } from "./GUITypes";
import { useAppDispatch } from "../redux/Hooks";
import { closeObjectWindow } from "../redux/GUISlice";
import ObjectEditor from "./windows/ObjectEditor";
import CloseIcon from "@mui/icons-material/CloseRounded";
import FullscreenIcon from "@mui/icons-material/FullscreenRounded";
import MinimizeIcon from "@mui/icons-material/MinimizeRounded";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Grow in={true} ref={ref} {...props} />;
});

interface IProps {};
interface IState {
    isOpen: boolean
};

// TODO paper has an xs property, see if I can move the jankey css to that instead
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
              <Paper {...this.props} sx={{}}/>
            </Draggable>
        )
    }
}

// TODO this componet dissapears on close, this breaks the outgoing transition
export default function Window(props: IWindow) {
  const dispatch = useAppDispatch();
  const window = props;

  function handleClose(event: any, reason: any) {
    if(reason && reason == "backdropClick") {
      return;
    }

    dispatch(closeObjectWindow(window.id));
  }

  function handleSave(event: any, reason: any) {

  }

  function getDialogContent() {
    if(window.type === "object") {
      return (<ObjectEditor {...window.data} />)
    } else {
      return (<Typography>Unimplemented</Typography>)
    }
  }

  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      hideBackdrop={true}
      disableEnforceFocus={true}
      className="dialog"
    >
      <DialogTitle style={{ cursor: 'move', height: "2em", display: "flex", padding: "10px 0px 25px 15px" }} id="draggable-dialog-title" className="dialogHeader">
        <Typography variant="subtitle2" sx={{flexGrow: 1}}>{window.name}</Typography>
        <IconButton onClick={() => {handleClose(null, "closeBtn")}}><CloseIcon fontSize="small"/></IconButton>
        <IconButton><FullscreenIcon fontSize="small"/></IconButton>
        <IconButton><MinimizeIcon fontSize="small"/></IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {getDialogContent()}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => {handleSave(null, "saveBtn")}}>
          Save
        </Button>
        <Button autoFocus onClick={() => {handleClose(null, "closeBtn")}}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}