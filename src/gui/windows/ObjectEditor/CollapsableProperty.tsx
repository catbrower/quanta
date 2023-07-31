import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

interface IState {
  isOpen: boolean,
  hasMounted: boolean
}

interface IProps {
  name: string,
  children: any
}

// TODO fix the accordion
export default class CollapsableProperty extends React.Component<IProps, IState> {
  // const [open, setOpen] = useState(false);
  constructor(props: any) {
    super(props);

    this.state = {
      isOpen: true,
      hasMounted: false
    }
  }

  componentDidMount(): void {
    this.setState({ hasMounted: true })
  }

  shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
    if (this.state.hasMounted) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <Accordion expanded={this.state.isOpen} onChange={() => { this.setState({ isOpen: !this.state.isOpen }) }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{this.props.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {this.props.children}
        </AccordionDetails>
      </Accordion>
    )
  }
}