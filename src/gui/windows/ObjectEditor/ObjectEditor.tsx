import { Box, Button, DialogActions, DialogContent, Divider, IconButton, ListItemText, Menu, MenuItem, MenuList, Paper, Select, Stack, Tab, Tabs, TextField, styled } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { capitalize, deepCopyJSON } from "../../../Common";
import { EVENTS, MESH_TYPE_ALL } from "../../../Constants";
import { IProgramEvent, IProgramObject } from "../../../program/ProgramInterfaces";
import { updateObject } from "../../../redux/CodeSlice";
import { useAppDispatch } from "../../../redux/Hooks";
import { IWindow } from "../../GUITypes";
import EventEditor from "./EventEditor";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import React from "react";

const modalWidth = 500;

const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});

const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&.Mui-selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }),
);

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-selected': {
    color: '#fff',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >

      {value === index && (
        <Box sx={{ pl: 3, width: `${modalWidth}px` }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface IObjectEditorProps {
  window: IWindow,
  object: IProgramObject,
  onClose: any
}

// TODO instead of using uuids, should pass down the json path of the value starting with the object id
// that way it's unique but doesn't change
export default function ObjectEditor(props: IObjectEditorProps) {
  const formReducer = (state: IProgramObject, event: any) => {
    let result: IProgramObject = deepCopyJSON(state);
    const path = event.target.name;
    if (path === "name") {
      return {
        ...result,
        [event.target.name]: event.target.value
      }
    }

    return result;
  }

  const [tabIndex, setTabIndex] = useState(0);
  // const [formData, setFormData] = useReducer(formReducer, props.object);
  const [editedObject, setEditedObject] = useState(props.object);
  const dispatch = useAppDispatch();
  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  }

  function handleSave(event: any) {
    dispatch(updateObject(editedObject));
  }

  const updateEvent = (eventName: string, eventData: IProgramEvent) => {
    let result = { ...editedObject };
    result.events = { ...editedObject.events };
    result.events[eventData.name] = eventData;
    setEditedObject(result);
  }

  const setMeshType = (event: any) => {
    let result = { ...editedObject }
    result.mesh = { ...result.mesh }
    result.mesh.type = event.target.value;
    setEditedObject(result)
  }

  const setName = (event: any) => {
    let result = {
      ...editedObject,
      "name": event.target.value
    }
    setEditedObject(result)
  }

  // Add event menu
  const [addEventMenuAnchorEl, setAddMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const addEventMenuIsOpen = Boolean(addEventMenuAnchorEl);
  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddMenuAnchorEl(event.currentTarget);
  };
  const handleAddClose = () => {
    setAddMenuAnchorEl(null);
  };
  const addEvent = (eventName: string) => {
    if (!(eventName in props.object.events)) {
      let result = { ...editedObject };
      result.events = {
        ...editedObject.events,
        [eventName]: {
          name: eventName,
          steps: []
        }
      }
      setEditedObject(result);
    }
  }

  return (
    <>
      <DialogContent style={{ overflow: "hidden", height: "50vh" }}>
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }} >
          <Box style={{ overflow: "hidden" }}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              orientation="vertical"
            >
              <Tab label="Properties" value={0} />
              {Object.entries(editedObject.events).map(([k, v], i) => {
                return (<Tab key={uuidv4()} label={v.name} value={i + 1} />)
              })}
            </Tabs>
            <IconButton onClick={handleAddClick}>
              <AddRoundedIcon />
            </IconButton>
            <Menu
              open={addEventMenuIsOpen}
              anchorEl={addEventMenuAnchorEl}
              onClose={handleAddClose}
            >
              <Paper>
                <MenuList>
                  {Object.values(EVENTS).filter((eventName) => !(eventName in editedObject.events)).map((eventName) => {
                    return (
                      <MenuItem key={uuidv4()} onClick={(e) => addEvent(eventName)}>
                        <ListItemText>{capitalize(eventName)}</ListItemText>
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </Paper>
            </Menu>
          </Box>
          <Box style={{ height: "50vh", overflowY: "auto" }}>
            <TabPanel value={tabIndex} index={0}>
              <Stack direction="column" spacing={1}>
                <TextField variant="standard" label="Name" name="name" onChange={setName} defaultValue={props.object.name} />
                <Divider />
                <Select name="mesh.type" onChange={setMeshType} defaultValue={props.object.mesh.type}>
                  {MESH_TYPE_ALL.map((meshType) => (<MenuItem key={uuidv4()} value={meshType}>{capitalize(meshType)}</MenuItem>))}
                </Select>
              </Stack>
            </TabPanel>

            {Object.entries(editedObject.events).map(([k, v], i) => {
              return (
                <TabPanel key={uuidv4()} value={tabIndex} index={i + 1}>
                  <EventEditor key={`${props.object.id}.${v.name}`} objectId={props.object.id} onUpdate={(e: any) => { updateEvent(k, e) }} event={v} />
                </TabPanel>
              )
            })}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>
          Save
        </Button>
        <Button onClick={() => { props.onClose(null, "closeBtn") }}>
          Close
        </Button>
      </DialogActions>
    </>
  )
}