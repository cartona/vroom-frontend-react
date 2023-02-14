import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useContext } from "react";
import { RoutingContext } from "../../context/routeContext";
import jsonValidator from "./jsonValidator";
function Upload() {
  const { setJobs, setVehicles, toasters } = useContext(RoutingContext);
  const handleFileRead = (e: any) => {
    try {
    const content = JSON.parse(e.target.result);
    const validateContent = jsonValidator(content)
    if (!validateContent.valid){
      toasters.errorToaster(validateContent.message)
      return
    }
    setJobs(content.jobs);
    setVehicles(content.vehicles);
    }
    catch(err){
      toasters.errorToaster("Can't parse JSON File")
    }
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
