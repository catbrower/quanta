import {
    AppBar,
    IconButton,
    Toolbar
} from "@mui/material";
import HardwareIcon from '@mui/icons-material/HardwareRounded';

import FileMenu from "./menus/FileMenu";
import RunMenu from "./menus/RunMenu";
import { useAppDispatch } from "../redux/Hooks";
import { build } from "../redux/CodeSlice";

export default function AppBarTop() {
  const dispatch = useAppDispatch();

  return (
    <AppBar position="fixed" sx={{bottom: "auto", top: 0}}>
      <Toolbar>
        <FileMenu />
        <RunMenu />

        <IconButton onClick={() => dispatch(build())}>
          <HardwareIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}