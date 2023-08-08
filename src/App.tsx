import { Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import './App.css';
import GUI from './gui/GUI';
import ContextMenu from './gui/context menu/ContextMenu';
import { closeContextMenu, openContextMenu } from './redux/ContextMenuSlice';

export default function App() {
  const dispatch = useDispatch()
  return (
    <Box width={'100vw'} height={'100vh'}
      onContextMenu={(e) => {
        e.preventDefault();
        dispatch(openContextMenu({ x: e.clientX, y: e.clientY }));
      }}
      onClick={() => {
        dispatch(closeContextMenu())
      }}
    >
      <GUI />
      <Typography id="bgText" variant='h1' align="center">
        Quanta
      </Typography>
      <ContextMenu />
    </Box>
  )
}
