import { useContext, useState } from "react";
import { RoutingContext } from "../../context/routeContext";
import { solve } from "../../api";
export const useVroom = () => {
  const [loading, setLoading] = useState(false);
  const { jobs, vehicles, toasters, setSolution } = useContext(RoutingContext);

  const fetchSolution = async () => {
    if(jobs.length === 0 || vehicles.length === 0){
      toasters.errorToaster("File specified is missing either jobs or vehicles.");
      return;
    }
    setLoading(true);
    if (!IsPayloadValid) {
      setLoading(false);
      return;
    }
    const { response, error, errorMessage } = await solve({ jobs, vehicles });
    if (error) {
      setLoading(false);
      toasters.errorToaster(errorMessage);
      return;
    }
    setSolution(response);
    setLoading(false);
    return;
  };

  const IsPayloadValid = () => {
    if (jobs.length === 0 || vehicles.length === 0) {
      toasters.errorToaster(
        "Either jobs or vehicles is empty. Please re check and try again."
      );
      return false;
    }
    return true;
  };

  return { fetchSolution, loading };
};
