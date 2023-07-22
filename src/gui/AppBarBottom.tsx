import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ProgramEditor from './ProgramEditor';
import { useAppDispatch, useAppSelector } from '../redux/Hooks';
import { openMenu, closeMenu } from '../redux/GUISlice';
import AppBarTop from './AppBarTop';
import { IWindow } from './GUITypes';
import Window from './Window';
import { Typography } from '@mui/material';

const drawerWidth = 500;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// TODO seperate this out
export default function AppBarBottom() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(state => state.gui.isMenuOpen);
  const windows = useAppSelector(state => state.gui.windows);

  return (
    <>
      <Typography>{window.name}</Typography>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <AppBar position="fixed" sx={{top: "auto", bottom: 0}}>
          <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => {dispatch(openMenu())}}
                edge="start"
                // sx={{ mr: 2, ...(isOpen && { display: 'none' }) }}
            >
              <MenuIcon />
          </IconButton>

          {windows.map((window: IWindow) => (<Window key={window.id} {...window}/>))}

          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
          },
          }}
          variant="persistent"
          anchor="left"
          open={isOpen}
        >
          <DrawerHeader>
              Program
              <IconButton onClick={() => dispatch(closeMenu())}>
                  <ChevronLeftIcon />
              </IconButton>
          </DrawerHeader>
          
          <Divider />

          <ProgramEditor />
        </Drawer>
      </Box>
    </>
  )
}