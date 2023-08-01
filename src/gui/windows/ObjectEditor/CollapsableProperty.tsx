import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useDispatch } from 'react-redux';
import { getJSONProperty } from '../../../Common';
import { addCollapseablePropertyState, openCollapseableProperty } from '../../../redux/GUISlice';
import { useAppSelector } from '../../../redux/Hooks';

interface ICollapseableState {
  id: string,
  isOpen: boolean,
  focus: HTMLElement | null
}

interface IProps {
  id: string,
  name: string,
  children: any
}

export default function CollapsableProperty(props: IProps) {
  const dispatch = useDispatch();
  dispatch(addCollapseablePropertyState({ id: props.id, isOpen: false, focus: null }));

  const state = useAppSelector(state => getJSONProperty(state.gui.collapseableProperties, props.id)) as ICollapseableState;
  let isOpen = state && state.isOpen ? state.isOpen : false

  const handleChange = () => {
    dispatch(openCollapseableProperty({ id: props.id, isOpen: !isOpen, focus: null }));
  }

  return (
    <Accordion expanded={isOpen} onChange={() => { handleChange() }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{props.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {props.children}
      </AccordionDetails>
    </Accordion>
  )
}