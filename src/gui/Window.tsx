import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from "@mui/material";
import React from "react";
import Draggable from "react-draggable";

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

export default class Window extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            isOpen: true
        }
    }

    setOpen(openState: boolean) {
        this.setState({isOpen: openState});
    }

    handleClickOpen() {
      // this.setOpen(true);
    }
  
    handleClose(event: any, reason: any) {
      if(reason && reason == "backdropClick") {
        return;
      }

      this.setOpen(false);
    }
  
    render() {
      return (
        <div>
          <Dialog
            open={this.state.isOpen}
            onClose={this.handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            hideBackdrop={true}
            disableEnforceFocus={true}
            
          >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
              Subscribe
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address here. We
                will send updates occasionally.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={() => {this.handleClose(null, null)}}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }