import { AppBar, Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";

import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';

function FileMenu() {
    return (
        <Paper sx={{ width: 320, maxWidth: '100%' }}>
        <MenuList>
            <MenuItem>
                <ListItemIcon>
                    <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>New</ListItemText>
                <Typography variant="body2" color="text.secondary">
                    ⌘N
                </Typography>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Open</ListItemText>
                <Typography variant="body2" color="text.secondary">
                    ⌘S
                </Typography>
                </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Save</ListItemText>
                <Typography variant="body2" color="text.secondary">
                    ⌘S
                </Typography>
            </MenuItem>

            <Divider />

            <MenuItem>
            <ListItemIcon>
                <Cloud fontSize="small" />
            </ListItemIcon>
                <ListItemText>Preferences</ListItemText>
            </MenuItem>
      </MenuList>
      </Paper>
    )
}


export default function AppBarTop() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
      <AppBar position="fixed" sx={{bottom: "auto", top: 0}}>
        <Toolbar>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            style={{color: "white"}}
          >
            File
          </Button>
          <Menu
            id="file-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
          >
            <FileMenu />
          </Menu>
        </Toolbar>
      </AppBar>
    )
}