import React, { useEffect } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import './App.css';
import GUI from './gui/GUI';
import { useAppDispatch, useAppSelector } from './Hooks';
import Universe from './objects/Universe';

export default function App() {
  // private universe: Universe | null = null;
  const dispatch = useAppDispatch();
  const universeParams = useAppSelector(state => state.code);

  function createUniverse() {
    const universe = new Universe(universeParams);
    universe.begin();
  }

  // TODO the createUniverse call to some run button
  useEffect(() => {
    createUniverse();
  })

  return (
    <>
      <GUI />
      <canvas id="canvas"></canvas>
    </>
  )
}
