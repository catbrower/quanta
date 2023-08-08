import { Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import React from "react";
import { addObject } from "../../redux/CodeSlice";
import { MATERIAL_TYPES, MESH_TYPE_DEFAULT } from "../../Constants";
import { v4 as uuidv4 } from 'uuid';

export default function NewMenu() {
  const dispatch = useAppDispatch();
  const program = useAppSelector(state => state.code.program);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const createNewObject = () => {
    dispatch(addObject())
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
        New
      </Button>

      <Menu
        id="run-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        <Box sx={{ width: 320, maxWidth: '100%' }}>
          <MenuList>
            <MenuItem onClick={createNewObject}>
              <ListItemText>Object</ListItemText>
            </MenuItem>
          </MenuList>
        </Box>
      </Menu>
    </>
  )
}