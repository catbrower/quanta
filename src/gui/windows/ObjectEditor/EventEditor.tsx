import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, ListItemText, Menu, MenuItem, MenuList, Paper, Stack } from "@mui/material";
import React, { FC, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { capitalize, uniformColor, uniformEuler } from "../../../Common";
import { DND_TYPES, EVENT_STEPS } from "../../../Constants";
import { IProgramEvent, IProgramEventStep } from "../../../program/ProgramInterfaces";
import EditableStruct from "./EditableStruct";
import { Droppable, Draggable, DraggableProvided, DraggableStateSnapshot, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";


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
    result.steps = [...props.event.steps].filter((_, index) => { return index !== removeIndex });
    props.onUpdate(result);
  }

  let eventSteps: ReactNode[] = [];
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
    <Box>
      <Stack direction="column" spacing={0.5} py={1}>

        <Droppable droppableId="eventEditor">
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}

            >
              {props.event.steps.map((item: IProgramEventStep, index: number) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(providedDraggable: any, snapshotDraggable: DraggableStateSnapshot) => (
                    <div>
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                      >
                        stuff
                      </div>
                      {providedDraggable.placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
          {/* {eventSteps} */}
        </Droppable>

        < Stack direction="row" alignItems="center" justifyContent="center" pt={5}>
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
                {Object.values(EVENT_STEPS).filter((propName) => !(propName in props.event)).map((propName) => {
                  return (
                    <MenuItem key={uuidv4()} onClick={() => addEventStep(propName)}>
                      <ListItemText>{capitalize(propName)}</ListItemText>
                    </MenuItem>
                  )
                })}
              </MenuList>
            </Paper>
          </Menu>
        </Stack >
      </Stack>
    </Box>
  )
}