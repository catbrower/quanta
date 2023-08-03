import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch } from 'react-redux';
import { getJSONProperty } from '../../../Common';
import { addCollapseablePropertyState, openCollapseableProperty } from '../../../redux/GUISlice';
import { useAppSelector } from '../../../redux/Hooks';

const HEADER_HEIGHT = "3em";
const RIGHT_MARGIN = "2.5em";

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
      <Stack direction="row" mb={0} style={{ position: "relative", border: "solid 1px black", zIndex: "1", height: HEADER_HEIGHT, width: RIGHT_MARGIN, overflow: "show" }}>
        <IconButton onClick={props.onDelete}>
          <ClearRoundedIcon />
        </IconButton>
      </Stack>

      <Accordion style={{ marginRight: RIGHT_MARGIN, marginTop: "0px", marginBottom: "0px", top: `-${HEADER_HEIGHT}` }} expanded={isOpen} onChange={() => { handleChange() }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ marginLeft: RIGHT_MARGIN, height: HEADER_HEIGHT, backgroundColor: "aliceblue" }}
        >
          <Typography className="unselectable" lineHeight={0} style={{ transform: "translateY(50%)" }}>{props.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {props.children}
        </AccordionDetails>
      </Accordion>

    </>
  )
}