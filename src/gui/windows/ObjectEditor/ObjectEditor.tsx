import { Box, Button, DialogActions, DialogContent, Stack, Tab, Tabs, TextField, styled } from "@mui/material";
import { useReducer, useState } from "react";
import { OBJECT_JSON_PATH_SEPERATOR, deepCopyJSON, updateJSONValue } from "../../../Common";
import { IProgramColor, IProgramEvent, IProgramObject } from "../../../program/Interfaces";
import { updateObjectEditorData } from "../../../redux/GUISlice";
import { useAppDispatch } from "../../../redux/Hooks";
import { IWindow } from "../../GUITypes";
import EditableColor from "./EditableColor";
import EditableEuler from "./EditableEuler";
import { updateObject } from "../../../redux/CodeSlice";
import { v4 as uuidv4 } from 'uuid';

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

interface IEventEditorProps extends IProgramEvent {
  name: string,
  event: IProgramEvent,
  onUpdate: any
}

// TODO check for / create a new interface to specify props
// events should have the exact same type as this
// doing it this way, I can avoid writing a specialized editor for each event
function EventEditor(props: IEventEditorProps) {
  const dispatch = useAppDispatch();
  const onUpdate = (path: string, data: any) => {
    dispatch(updateObjectEditorData({ data: data, path: path }))
  }

  let properties = [];
  const path = `event.${props.name}`;
  if (props.event.color) {
    const name = `${props.name}${OBJECT_JSON_PATH_SEPERATOR}color`;
    properties.push((
      <EditableColor
        key={uuidv4()}
        name={name}
        onUpdate={props.onUpdate}
        data={props.event.color} />
    ));
  }

  if (props.event.rotation) {
    const name = `${props.name}${OBJECT_JSON_PATH_SEPERATOR}rotation`;
    properties.push((
      <EditableEuler
        key={uuidv4()}
        name={name}
        onUpdate={props.onUpdate}
        data={props.event.rotation} />
    ));
  }

  if (props.event.translation) {
    const name = `${props.name}${OBJECT_JSON_PATH_SEPERATOR}translation`;
    properties.push((
      <EditableEuler
        key={uuidv4()}
        name={name}
        onUpdate={props.onUpdate}
        data={props.event.translation} />
    ));
  }

  if (props.event.scale) {
    const name = `${props.name}${OBJECT_JSON_PATH_SEPERATOR}scale`
    properties.push((
      <EditableEuler
        key={uuidv4()}
        name={name}
        onUpdate={props.onUpdate}
        data={props.event.scale} />
    ));
  }

  return (
    <Stack direction="column" spacing={1} py={1}>
      {properties}
    </Stack>
  )
}

interface IObjectEditorProps {
  window: IWindow,
  object: IProgramObject,
  onClose: any
}
export default function ObjectEditor(props: IObjectEditorProps) {
  const formReducer = (state: IProgramObject, event: any) => {
    let result = deepCopyJSON(state);
    const path = event.target.name;
    if (path === "name") {
      return {
        ...result,
        [event.target.name]: event.target.value
      }
    }

    const pathParts = path.split(OBJECT_JSON_PATH_SEPERATOR);
    if (pathParts[0] === "event") {
      for (let eventIndex = 0; eventIndex < props.object.events.length; eventIndex++) {
        const objEvent = props.object.events[eventIndex];
        if (objEvent.name !== pathParts[1]) {
          continue;
        }

        if (pathParts[2] === "color") {
          result.events[eventIndex].color = updateJSONValue(result.events[eventIndex].color, pathParts[3], event.target.value) as IProgramColor;
        }
      }
    }

    return result;
  }

  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useReducer(formReducer, props.object);
  const dispatch = useAppDispatch();
  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  }

  function handleSave(event: any) {
    dispatch(updateObject(formData));
  }

  return (
    <>
      <DialogContent>
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }} >
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            orientation="vertical"
          >
            <Tab label="Properties" value={0} />
            {formData.events.map((item: IProgramEvent, index: number) => {
              return (<Tab key={uuidv4()} label={item.name} value={index + 1} />)
            })}
          </Tabs>
          <TabPanel value={tabIndex} index={0}>
            <TextField variant="standard" label="Name" name="name" onChange={setFormData} defaultValue={props.object.name} />
          </TabPanel>

          {formData.events.map((item: IProgramEvent, index: number) => {
            return (
              <TabPanel key={uuidv4()} value={tabIndex} index={1}>
                <EventEditor onUpdate={setFormData} name={`event${OBJECT_JSON_PATH_SEPERATOR}${item.name}`} event={item} />
              </TabPanel>
            )
          })}
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