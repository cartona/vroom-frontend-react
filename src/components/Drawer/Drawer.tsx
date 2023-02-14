import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { RoutingContext } from "../../context/routeContext";
import CloseIcon from "@mui/icons-material/Close";
import "./Drawer.css";
import { Key } from "../../models/ManageEntity";
const drawerWidth = 350;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

type mapDrawerProps = {
  flyTo: (location: number[] | undefined) => void;
};
const MapDrawer: React.FC<mapDrawerProps> = ({ flyTo }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { vehicles, jobs, ManageJob, ManageVehicle } =
    React.useContext(RoutingContext);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none",
        }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            sx={{ flexGrow: 1 }}
            component="div"
          ></Typography>
          <Button
            sx={{ ...(open && { display: "none"}) }}
            variant="contained"
            size="large"
            color="inherit"
            onClick={handleDrawerOpen}
          >
            <ChevronLeftIcon color="action" />
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        className="drawer"
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Box sx={{ padding: 3 }}>
          <img src={"vroom.svg"} alt="vroom-logo" />
        </Box>
        <List sx={{ paddingLeft: 1 }}>
          {vehicles.map((vehicle, index) => (
            <div key={index}>
              <ListItem disablePadding key={index}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {`Vehicle${index + 1}`}
                </Typography>
              </ListItem>
              {vehicle.start && (
                <ListItem disablePadding>
                  <IconButton
                    onClick={() => {
                      ManageVehicle(vehicle, Key.Delete, vehicle.start);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <ListItemText
                    sx={{ color: "green" }}
                    primary={"Start"}
                    className="clickable"
                    onClick={() => flyTo(vehicle.start)}
                  />
                </ListItem>
              )}
              {vehicle.end && (
                <ListItem disablePadding>
                  <IconButton
                    onClick={() => {
                      ManageVehicle(
                        vehicle,
                        Key.Delete,
                        undefined,
                        vehicle.end
                      );
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <ListItemText
                    sx={{ color: "red" }}
                    primary={"End"}
                    className="clickable"
                    onClick={() => flyTo(vehicle.end)}
                  />
                </ListItem>
              )}
            </div>
          ))}
          <Divider />
          {jobs.map((job, index) => (
            <ListItem key={index} disablePadding>
              <IconButton
                onClick={() => {
                  ManageJob(job, Key.Delete);
                }}
              >
                <CloseIcon />
              </IconButton>
              <ListItemText
                primary={`${job.description}`}
                className="clickable"
                onClick={() => flyTo(job.location)}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
export default MapDrawer;
