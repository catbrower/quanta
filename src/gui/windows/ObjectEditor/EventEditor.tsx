import AddIcon from "@mui/icons-material/Add";
import { IconButton, ListItemText, Menu, MenuItem, MenuList, Paper, Stack } from "@mui/material";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { capitalize, uniformColor, uniformEuler } from "../../../Common";
import { EVENT_STEPS, EVENT_STEP_ALL } from "../../../Constants";
import { IProgramEvent } from "../../../program/ProgramInterfaces";
import EditableStruct from "./EditableStruct";

interface IEventEditorProps {
  objectId: string,
  event: IProgramEvent,
  onUpdate: any
}

export default function EventEditor(props: IEventEditorProps) {
  const [addMenuAnchorEl, setAddMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const addMenuIsOpen = Boolean(addMenuAnchorEl);
  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddMenuAnchorEl(event.currentTarget);
  };
  const handleAddClose = () => {
    setAddMenuAnchorEl(null);
  };

  const setEventStep = (index: number, data: any) => {
    let result = { ...props.event };
    result.steps = [...props.event.steps];
    result.steps[index] = {
      ...props.event.steps[index],
      content: data
    };
    props.onUpdate(result);
  }

  const addEventStep = (stepType: string) => {
    let result = { ...props.event }
    result.steps = [...props.event.steps]
    switch (stepType) {
      case EVENT_STEPS.SET_COLOR:
        result.steps.push({
          id: uuidv4(),
          type: stepType,
          content: uniformColor("0")
        });
        break;
      case EVENT_STEPS.SET_ROTATION:
      case EVENT_STEPS.SET_SCALE:
      case EVENT_STEPS.SET_TRANSLATE:
        result.steps.push({
          id: uuidv4(),
          type: stepType,
          content: uniformEuler("0")
        });
        break;
      default:
        throw new Error(`Cannot add unkown step type: ${stepType}`);
    }
    props.onUpdate(result);
  }

  const deleteEventStep = (event: any, removeIndex: number) => {
    let result = { ...props.event };
    console.log(result.steps)
    result.steps = [...props.event.steps].filter((_, index) => { return index !== removeIndex })
    console.log(result.steps)
    props.onUpdate(result);
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
            key={`${props.objectId}.${props.event.name}.${i}`}
            name={`step.${i}`}
            label={`Set ${capitalize(eventStep.type)}`}
            onUpdate={(e: any) => { setEventStep(i, e.target.value) }}
            onDelete={(e: any) => deleteEventStep(e, i)}
            data={eventStep} />
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
                  <MenuItem key={uuidv4()} onClick={(e) => addEventStep(propName)}>
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