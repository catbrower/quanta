import AddIcon from "@mui/icons-material/Add";
import { IconButton, ListItemText, Menu, MenuItem, MenuList, Paper, Stack } from "@mui/material";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { capitalize } from "../../../Common";
import { EVENT_STEPS, EVENT_STEP_ALL } from "../../../Constants";
import { IProgramEvent } from "../../../program/ProgramInterfaces";
import EditableStruct from "./EditableStruct";

interface IEventEditorProps {
  event: IProgramEvent,
  onUpdate: any
}
// TODO check for / create a new interface to specify props
// events should have the exact same type as this
// doing it this way, I can avoid writing a specialized editor for each event
export default function EventEditor(props: IEventEditorProps) {
  const setEventStep = (index: number, data: any) => {
    let result = { ...props.event };
    result.steps = [...props.event.steps];
    result.steps[index] = {
      ...props.event.steps[index],
      content: data
    };
    props.onUpdate(result);
  }

  // const [event, setEvent] = useReducer(updateEvent, props.event);
  const [addMenuAnchorEl, setAddMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const addMenuIsOpen = Boolean(addMenuAnchorEl);
  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddMenuAnchorEl(event.currentTarget);
  };
  const handleAddClose = () => {
    setAddMenuAnchorEl(null);
  };

  const createAddEvent = (propName: string) => {
    // return {
    //   target: {
    //     name: `${props.name}${OBJECT_JSON_PATH_SEPERATOR}${propName}`
    //   }
    // }
  }

  let eventSteps = [];
  // for (const eventStep of props.event.steps) {
  for (let i = 0; i < props.event.steps.length; i++) {
    const eventStep = props.event.steps[i];
    switch (eventStep.type) {
      case (EVENT_STEPS.SET_COLOR):
      case (EVENT_STEPS.SET_SCALE):
      case (EVENT_STEPS.SET_TRANSLATE):
      case (EVENT_STEPS.SET_ROTATION):
        eventSteps.push(
          <EditableStruct
            key={uuidv4()}
            name={`step.${i}`}
            label={`Set ${capitalize(eventStep.type)}`}
            onUpdate={(e: any) => { setEventStep(i, e.target.value) }}
            data={eventStep.content} />
        )
        break;
      case (EVENT_STEPS.SET_POINT_SIZE):
        break;
      case (EVENT_STEPS.SET_SHADER):
        break;
    }
  }

  return (
    <Stack direction="column" spacing={1} py={1}>
      {eventSteps}
      <Stack direction="row" alignItems="center" justifyContent="center">
        <IconButton onClick={handleAddClick}>
          <AddIcon />
        </IconButton>

        <Menu
          open={addMenuIsOpen}
          anchorEl={addMenuAnchorEl}
          onClose={handleAddClose}
        >
          <Paper>
            <MenuList>
              {EVENT_STEP_ALL.filter((propName) => !(propName in props.event)).map((propName) => {
                return (
                  <MenuItem key={uuidv4()} onClick={(e) => props.onUpdate(createAddEvent(propName))}>
                    <ListItemText>{capitalize(propName)}</ListItemText>
                  </MenuItem>
                )
              })}
            </MenuList>
          </Paper>
        </Menu>
      </Stack>
    </Stack>
  )
}