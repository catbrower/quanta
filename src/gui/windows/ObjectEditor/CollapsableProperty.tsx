import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch } from 'react-redux';
import { getJSONProperty } from '../../../Common';
import { addCollapseablePropertyState, openCollapseableProperty } from '../../../redux/GUISlice';
import { useAppSelector } from '../../../redux/Hooks';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import zIndex from '@mui/material/styles/zIndex';

interface ICollapseableState {
  id: string,
  isOpen: boolean,
  focus: HTMLElement | null
}

interface IProps {
  id: string,
  name: string,
  children: any,
  onDelete: any
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
    <>
      <Stack direction="row" pl={1} style={{ position: "absolute", zIndex: "1", height: "3em" }}>
        <IconButton onClick={props.onDelete}>
          <ClearRoundedIcon />
        </IconButton>
        <Typography lineHeight={0} style={{ transform: "translateY(50%)" }}>{props.name}</Typography>
      </Stack>

      <Accordion style={{ marginRight: "0.25em", marginLeft: "0.25em", marginTop: "0px" }} expanded={isOpen} onClick={() => { }} onChange={() => { handleChange() }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ marginLeft: "3em", height: "3em" }}
        >
        </AccordionSummary>
        <AccordionDetails>
          {props.children}
        </AccordionDetails>
      </Accordion>
    </>
  )
}