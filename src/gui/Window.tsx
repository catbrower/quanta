import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grow, IconButton, Paper, Slide, Typography } from "@mui/material";
import React from "react";
import Draggable from "react-draggable";
import { IWindow } from "./GUITypes";
import { useAppDispatch } from "../redux/Hooks";
import { closeObjectWindow } from "../redux/GUISlice";
import ObjectEditor from "./windows/ObjectEditor/ObjectEditor";
import CloseIcon from "@mui/icons-material/CloseRounded";
import FullscreenIcon from "@mui/icons-material/FullscreenRounded";
import MinimizeIcon from "@mui/icons-material/MinimizeRounded";
import { TransitionProps } from "@mui/material/transitions";
import PreviewWindow from "./windows/PreviewWindow";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Grow in={true} ref={ref} {...props} />;
});

interface IProps { };
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
        <Paper {...this.props} sx={{}} />
      </Draggable>
    )
  }
}

// TODO this componet dissapears on close, this breaks the outgoing transition
export default function Window(props: IWindow) {
  const dispatch = useAppDispatch();
  const window = props;

  function handleClose(event: any, reason: any) {
    event.preventDefault();
    if (reason && reason == "backdropClick") {
      return;
    }

    dispatch(closeObjectWindow(window.id));
  }

  function getDialogContent() {
    if (window.type === "object") {
      return (<ObjectEditor onClose={handleClose} object={window.data} />)
    } else if (window.type === "preview") {
      return (<PreviewWindow />)
    } else {
      return (<>Unimplemented</>)
    }
  }

  return (
    <>
      <Box height="100%" style={{ borderRadius: "5px", boxShadow: "inset 0px 0px 5px 0px rgba(0, 0, 0, 0.25)" }}>
        <Typography>{props.name}</Typography>
      </Box>

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
          {window.name}
          <Box style={{ flex: "1" }} />
          <IconButton onClick={() => { handleClose(null, "closeBtn") }}><CloseIcon fontSize="small" /></IconButton>
          <IconButton><FullscreenIcon fontSize="small" /></IconButton>
          <IconButton><MinimizeIcon fontSize="small" /></IconButton>
        </DialogTitle>
        {getDialogContent()}
      </Dialog>
    </>
  );
}