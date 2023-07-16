import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Tab, Tabs, TextField, Typography, styled } from "@mui/material";
import { IProgramEuler, IProgramObject } from "../../code/Program";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";

const modalWidth = 500;
const textFeildVariant = "standard";

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

function editableEuler(props: IProgramEuler | undefined, name: string) {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>Set {name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack direction="column" spacing={2}>
                    <TextField variant={textFeildVariant} id={`${name}_x`} label="X" defaultValue={props?.x}/>
                    <TextField variant={textFeildVariant} id={`${name}_y`} label="Y" defaultValue={props?.y}/>
                    <TextField variant={textFeildVariant} id={`${name}_z`} label="Z" defaultValue={props?.z}/>
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}

// TODO check for / create a new interface to specify props
// events should have the exact same type as this
// doing it this way, I can avoid writing a specialized editor for each event
function EditorSection(props: any) {
    return (
        <Stack direction="column" spacing={1} py={1}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>Set Color</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack direction="column" spacing={2}>
                        <TextField variant={textFeildVariant} id="color_r" label="R" defaultValue={props.color?.r}/>
                        <TextField variant={textFeildVariant} id="color_g" label="G" defaultValue={props.color?.g}/>
                        <TextField variant={textFeildVariant} id="color_b" label="B" defaultValue={props.color?.b}/>
                        <TextField variant={textFeildVariant} id="color_a" label="A" defaultValue={props.color?.a}/>
                    </Stack>
                </AccordionDetails>
            </Accordion>

            {editableEuler(props.rotation, "rotation")}
            {editableEuler(props.translation, "translation")}
            {editableEuler(props.scale, "scale")}
        </Stack>
    )
}

export default function ObjectEditor(props: IProgramObject) {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
        setTabIndex(newIndex);
    }

    return (
        <Box
            sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224}}
        >
            <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                orientation="vertical"
            >
                <Tab label="Properties" value={0} />
                <Tab label="Create" value={1}/>
                <Tab label="Click" value={2}/>
            </Tabs>
            <TabPanel value={tabIndex} index={0}>
                <TextField variant={textFeildVariant} id="name" label="Name" defaultValue={props.name}/>
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <EditorSection {...props} />
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>YAAAK</TabPanel>
        </Box>
    )
}