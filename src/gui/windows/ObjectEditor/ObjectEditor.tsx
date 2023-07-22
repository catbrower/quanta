import { Box, Button, DialogActions, DialogContent, FormControl, Stack, Tab, Tabs, TextField, styled } from "@mui/material";
import { IProgramEvent, IProgramObject } from "../../../program/Interfaces";
import { useReducer, useState } from "react";
import { useAppDispatch } from "../../../redux/Hooks";
import { updateObject } from "../../../redux/CodeSlice";
import EditableColor from "./EditableColor";
import EditableEuler from "./EditableEuler";

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
            <Box sx={{ pl: 3, width: `${modalWidth}px`}}>
                {children}
            </Box>
        )}
        </div>
    );
}

interface IEditorSectionProps extends IProgramEvent {
  onChange: any
}

// TODO check for / create a new interface to specify props
// events should have the exact same type as this
// doing it this way, I can avoid writing a specialized editor for each event
function EditorSection(props: IEditorSectionProps) {
    let properties = [];
    if(props.color)
        properties.push((<EditableColor name="Color" {...props.color} />));

    if(props.rotation)
        properties.push((<EditableEuler name="Rotation" {...props.rotation} />));

    if(props.translation)
        properties.push((<EditableEuler name="translation" {...props.translation}/> ));
    
    if(props.scale)
        properties.push((<EditableEuler name="scale" {...props.scale} />));

    return (
        <Stack direction="column" spacing={1} py={1}>
            {properties}
        </Stack>
    )
}

const formReducer = (state: any, event: any) => {
  return {
    ...state,
    [event.target.name]: event.target.value
  }
}

interface IObjectEditorProps {
  object: IProgramObject,
  onClose: any
}
export default function ObjectEditor(props: IObjectEditorProps) {
    const [tabIndex, setTabIndex] = useState(0);
    const [formData, setFormData] = useReducer(formReducer, props.object);
    const objectId = props.object.id;
    const dispatch = useAppDispatch();
    const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
      setTabIndex(newIndex);
    }

    function handleSave(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      dispatch( updateObject(formData) );
    }

    function updateEvent(eventIndex: number, eventData: IProgramEvent) {
      console.log(eventData);
    }

    return (
      <form onSubmit={handleSave}>
        <DialogContent>
          <Box sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224}} >
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              orientation="vertical"
            >
              <Tab label="Properties" value={0} />
              {formData.events.map((item: IProgramEvent, index: number) => {
                return (<Tab label={item.name} value={index + 1} />)
              })}
            </Tabs>
              <TabPanel value={tabIndex} index={0}>
                <TextField variant="standard" onChange={setFormData} label="Name" name="name" defaultValue={props.object.name}/>
              </TabPanel>

              {formData.events.map((item: IProgramEvent, index: number) => {
                return (
                  <TabPanel value={tabIndex} index={1}>
                    <EditorSection onChange={(newData: IProgramEvent) => updateEvent(index - 1, newData)} {...item} />
                  </TabPanel>
                )
              })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit" >
            Save
          </Button>
          <Button onClick={() => {props.onClose(null, "closeBtn")}}>
            Close
          </Button>
        </DialogActions>
      </form>
    )
}