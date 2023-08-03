import { Typography } from '@mui/material';
import { useEffect } from 'react';
import './App.css';
import GUI from './gui/GUI';
import { useAppDispatch, useAppSelector } from './redux/Hooks';

export default function App() {
  // private universe: Universe | null = null;
  const dispatch = useAppDispatch();
  const universeParams = useAppSelector(state => state.code);
  const windows = useAppSelector(state => state.gui.windows);

  function createUniverse() {
    // const universe = new Universe(universeParams);
    // universe.begin();
  }

  // TODO the createUniverse call to some run button
  useEffect(() => {
    createUniverse();
  })

  return (
    <>
      <GUI />
      <Typography id="bgText" variant='h1' align="center">
        Quanta
      </Typography>
    </>
  )
}
