import AddIcon from "@mui/icons-material/Add";
import { IconButton, ListItemText, Menu, MenuItem, MenuList, Paper, Stack } from "@mui/material";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { OBJECT_JSON_PATH_SEPERATOR, capitalize } from "../../../Common";
import { EVENT_STEP_ALL, EVENT_STEP_COLOR, EVENT_STEP_POINT_SIZE, EVENT_STEP_ROTATE, EVENT_STEP_SCALE, EVENT_STEP_SET_SHADER, EVENT_STEP_TRANSLATE } from "../../../Constants";
import { IProgramEvent } from "../../../program/ProgramInterfaces";
import EditableColor from "./EditableColor";
import EditableEuler from "./EditableEuler";

interface IEventEditorProps {
  name: string,
  event: IProgramEvent,
  onUpdate: any
}
// TODO check for / create a new interface to specify props
// events should have the exact same type as this
// doing it this way, I can avoid writing a specialized editor for each event
export default function EventEditor(props: IEventEditorProps) {
  const [addMenuAnchorEl, setAddMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const addMenuIsOpen = Boolean(addMenuAnchorEl);
  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddMenuAnchorEl(event.currentTarget);
  };
  const handleAddClose = () => {
    setAddMenuAnchorEl(null);
  };

  const createAddEvent = (propName: string) => {
    return {
      target: {
        name: `${props.name}${OBJECT_JSON_PATH_SEPERATOR}${propName}`
      }
    }
  }

  const path = `event.${props.name}`;
  let eventSteps = [];
  for (const eventStep of props.event.steps) {
    switch (eventStep.type) {
      case (EVENT_STEP_COLOR):
        eventSteps.push(
          <EditableColor
            key={uuidv4()}
            name={`${props.name}${OBJECT_JSON_PATH_SEPERATOR}color`}
            onUpdate={props.onUpdate}
            data={eventStep.content} />
        )
        break;
      case (EVENT_STEP_SCALE):
      case (EVENT_STEP_TRANSLATE):
      case (EVENT_STEP_ROTATE):
        <EditableEuler
          key={uuidv4()}
          name={`${props.name}${OBJECT_JSON_PATH_SEPERATOR}${eventStep.type}`}
          onUpdate={props.onUpdate}
          data={eventStep.content} />
        break;
      case (EVENT_STEP_POINT_SIZE):
        break;
      case (EVENT_STEP_SET_SHADER):
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