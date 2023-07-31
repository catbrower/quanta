import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React from "react";

interface IState {
  isOpen: boolean,
  userHasUpdated: boolean
}

interface IProps {
  id: string,
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
      userHasUpdated: false
    }
  }

  render() {
    return (
      <Accordion expanded={this.state.isOpen} onChange={() => { this.setState({ isOpen: !this.state.isOpen, userHasUpdated: true }) }}>
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