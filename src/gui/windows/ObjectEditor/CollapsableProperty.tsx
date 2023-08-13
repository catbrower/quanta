import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Collapse, CssBaseline, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getJSONProperty } from '../../../Common';
import { addCollapseablePropertyState, openCollapseableProperty } from '../../../redux/GUISlice';
import { useAppSelector } from '../../../redux/Hooks';
import { DragSource } from '../../DragSource';

const HEADER_HEIGHT = "3em";
const RIGHT_MARGIN = "0.5em";
const HEADER_BUTTON_SIZE = "1.5em";

// const header_button_style = 

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

  const headerRef = useRef<HTMLElement>(null);
  const [headerProps, setHeaderProps] = useState({ width: 0, height: 0, top: 0, left: 0 });

  useEffect(() => {
    if (headerRef.current !== null) {
      let newProps = {
        width: headerRef.current.clientWidth,
        height: headerRef.current.clientHeight,
        left: 0,
        top: 0
      };

      if (JSON.stringify(newProps) !== JSON.stringify(headerProps)) {
        setHeaderProps(newProps);
      }
    }
  })

  return (
    <>
      <Box>
        <DragSource style={{ position: "absolute", height: HEADER_HEIGHT, width: `${headerProps.width}px`, zIndex: "0" }} type="justsomethings">
          <Typography className="unselectable" style={{ paddingLeft: "5em", transform: "translateY(50%)" }}>{props.name}</Typography>
        </DragSource>

        <Box ref={headerRef}>
          <Stack direction="row" width="100%" display="flex" style={{ position: "relative", height: HEADER_HEIGHT, background: "none", pointerEvents: "none" }}>
            <CssBaseline />
            <IconButton>
              <DragIndicatorIcon />
            </IconButton>

            <IconButton style={{ pointerEvents: "all" }} onClick={props.onDelete}>
              <ClearRoundedIcon />
            </IconButton>

            <Box flexGrow={1}></Box>

            <IconButton style={{ pointerEvents: "all" }} onClick={handleChange}>
              <ExpandMoreIcon />
            </IconButton>
          </Stack>
        </Box>
      </Box>

      <Collapse in={isOpen}>
        <Box p={"1em"}>
          {props.children}
        </Box>
      </Collapse>
    </>
  )
}