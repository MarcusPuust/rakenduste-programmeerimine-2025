import { useState } from "react";
import { Link as RouterLink, Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import FiberNewIcon from "@mui/icons-material/FiberNew";

const drawerWidth = 240;

export default function Layout() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);

  const nav = [
    { to: "/", label: "Home", icon: <HomeIcon /> },
    { to: "/new", label: "New", icon: <FiberNewIcon /> },
    { to: "/about", label: "About", icon: <InfoIcon /> },
  ];

  const DrawerContent = (
    <Box role="presentation" sx={{ width: { xs: 1, sm: drawerWidth } }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Navigation
      </Typography>
      <Divider />
      <List>
        {nav.map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.to}
              onClick={() => setOpen(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            sx={{ mr: 2, display: { sm: "none" } }}
            onClick={toggle}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MUI Veebirakendus
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {nav.map((n) => (
              <Button
                key={n.to}
                color="inherit"
                component={RouterLink}
                to={n.to}
                sx={{ ml: 1 }}
              >
                {n.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={open}
          onClose={toggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {DrawerContent}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
