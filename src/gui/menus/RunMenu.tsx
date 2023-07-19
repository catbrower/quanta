import { Button, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper } from "@mui/material"
import HardwareIcon from '@mui/icons-material/HardwareRounded';
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import buildProgram from "../../program/builder/ProgramBuilder";
import { setCompiledProgram } from "../../redux/CodeSlice";

export default function RunMenu() {
    const dispatch = useAppDispatch();
    const program = useAppSelector( state => state.code.program );
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const buildProgramWrapper = async () => {
      const compiledProgram = buildProgram(program);
      dispatch( setCompiledProgram(compiledProgram));
    }

    return (
      <>
        <Button
          aria-controls={open ? 'run-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          style={{ color: "white" }}
        >
          Run
        </Button>
        
        <Menu
          id="run-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ 'aria-labelledby': 'basic-button' }}
        >
          <Paper sx={{ width: 320, maxWidth: '100%' }}>
            <MenuList>
              <MenuItem onClick={() => buildProgramWrapper()}>
                <ListItemIcon>
                  <HardwareIcon />
                </ListItemIcon>
                <ListItemText>Build</ListItemText>
              </MenuItem>
            </MenuList>
          </Paper>
        </Menu>
      </>
    )
}