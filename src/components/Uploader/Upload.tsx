import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useContext } from "react";
import { RoutingContext } from "../../context/routeContext";
function Upload() {
  const { setJobs, setVehicles } = useContext(RoutingContext);
  const handleFileRead = (e: any) => {
    const content = JSON.parse(e.target.result);
    setJobs(content.jobs);
    setVehicles(content.vehicles);
  };

  const readFile = (e: any) => {
    let file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = handleFileRead;
    reader.readAsText(file);
  };
  return (
    <Button size="large" component="label" color="inherit">
      <FileUploadIcon color="action"/>
      <input
        hidden
        type="file"
        accept="application/json"
        onChange={(e) => {
          readFile(e);
          e.target.value = "";
        }}
      />
    </Button>
  );
}

export default Upload;
