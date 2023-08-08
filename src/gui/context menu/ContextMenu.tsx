import { Box, Divider, ListItemText, Menu, MenuItem, MenuList } from "@mui/material";
import { createRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CONTEXT_MENU_CONTENT_TYPES } from "../../Constants";
import { addObject, removeObject } from "../../redux/CodeSlice";
import { setAnchor } from "../../redux/ContextMenuSlice";
import { useAppSelector } from "../../redux/Hooks";

// TODO there seems to be a bug that on first click, an error is thrown
export default function ContextMenu() {
  const dispatch = useDispatch();
  const anchorRef = createRef<Element>();
  const contextMenuState = useAppSelector(state => state.contextMenu);

  useEffect(() => {
    if (anchorRef.current !== null) {
      dispatch(setAnchor(anchorRef.current as Element));
    }
  })

  const getMenuOptions = () => {
    switch (contextMenuState.type) {
      case CONTEXT_MENU_CONTENT_TYPES.PROGRAM_EDITOR_OBJECT:
        const objectId = contextMenuState.payload;
        return (
          <Box>
            <MenuItem onClick={() => { dispatch(addObject()) }}>
              <ListItemText>New</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => { dispatch(removeObject(objectId)) }}>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
            <Divider />
          </Box>
        )
    }
  }

  return (
    <Box position={"fixed"} left={contextMenuState.x} top={contextMenuState.y} ref={anchorRef}>
      <Menu
        id="file-menu"
        open={contextMenuState.isOpen}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
        anchorEl={contextMenuState.anchor}
      >
        <Box sx={{ width: 320, maxWidth: '100%' }}>
          <MenuList>
            {getMenuOptions()}
            <MenuItem>
              <ListItemText>About</ListItemText>
            </MenuItem>
          </MenuList>
        </Box>
      </Menu>
    </Box>
  )
}