import {
    AppBar,
    Toolbar
} from "@mui/material";
import FileMenu from "./menus/FileMenu";

export default function AppBarTop() {
    return (
      <AppBar position="fixed" sx={{bottom: "auto", top: 0}}>
        <Toolbar>
          <FileMenu />
        </Toolbar>
      </AppBar>
    )
}