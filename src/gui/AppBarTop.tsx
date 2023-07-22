import {
  AppBar,
  IconButton,
  Toolbar
} from "@mui/material";
import HardwareIcon from '@mui/icons-material/HardwareRounded';
import DownloadIcon from '@mui/icons-material/DownloadRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrowRounded';

import FileMenu from "./menus/FileMenu";
import RunMenu from "./menus/RunMenu";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { setCompiledProgram } from "../redux/CodeSlice";
import buildProgram from "../program/builder/ProgramBuilder";
import { openPreviewWindow } from "../redux/GUISlice";

export default function AppBarTop() {
  const dispatch = useAppDispatch();
  const program = useAppSelector(state => state.code.program);
  const builtProgram: string | null = useAppSelector(state => state.code.compiledProgram);

  const buildProgramWrapper = async () => {
    const compiledProgram = await buildProgram(program);
    dispatch(setCompiledProgram(compiledProgram));
  }

  const buildAndPlay = async () => {
    buildProgramWrapper();
    dispatch(openPreviewWindow());
  }

  return (
    <AppBar position="fixed" sx={{ bottom: "auto", top: 0 }}>
      <Toolbar>
        <FileMenu />
        <RunMenu />

        <IconButton onClick={() => buildAndPlay()}>
          <PlayArrowIcon />
        </IconButton>

        <IconButton
          disabled={builtProgram === null}
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(builtProgram ? builtProgram : '')}`}
          download={"CompiledProgram.html"}
        >
          <DownloadIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}