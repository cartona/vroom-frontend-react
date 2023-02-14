import { ButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import "./Settings.css";
import Upload from "../Uploader/Upload";
import { useContext } from "react";
import { RoutingContext } from "../../context/routeContext";
const Settings: React.FC<{ solver: any }> = ({ solver }) => {
  const { clearContext } = useContext(RoutingContext);
  const buttons = [
    <Upload key={1} />,
    <Button
      sx={{ marginTop: 0.5 }}
      key={2}
      color="inherit"
      size="large"
      onClick={() => solver() }
    >
      <DeviceHubIcon color="action" />
    </Button>,
    <Button
      sx={{ marginTop: 0.5 }}
      key={3}
      color="inherit"
      onClick={() => clearContext()}
      size="large"
    >
      <DeleteIcon color="action" />
    </Button>,
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 9999,
        left: 0,
        top: 100,
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        orientation="vertical"
        className="group"
        aria-label="vertical contained button group"
        variant="contained"
      >
        {buttons}
      </ButtonGroup>
    </Box>
  );
};

export default Settings;
