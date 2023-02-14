import { createContext, useState } from "react";
import Payload from "../models/Payload";
import Vehicle from "../models/Vehicle";
import Job from "../models/Job";
import { Key } from "../models/ManageEntity";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { canDelete } from "./permissions";
import { Solution } from "../models/Solution";
type toaster = (text: any) => void;
type Props = {
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  clearContext: () => void;
  ManageJob: (job: Job, key: Key) => void;
  ManageVehicle: (
    vehicle: Vehicle,
    key: Key,
    start?: number[],
    end?: number[]
  ) => void;
  toasters: { successToaster: toaster; errorToaster: toaster };
  solution?: Solution;
  setSolution: React.Dispatch<React.SetStateAction<Solution | undefined>>;
};

type routingProps = Props & Payload;

export const RoutingContext = createContext<routingProps>({
  vehicles: [],
  jobs: [],
  setVehicles: () => {},
  setJobs: () => {},
  clearContext: () => {},
  ManageVehicle: () => {},
  ManageJob: () => {},
  toasters: { successToaster: () => {}, errorToaster: () => {} },
  solution: undefined,
  setSolution: () => {},
});

const RoutingWrapper: React.FC<{ children: any }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [solution, setSolution] = useState<Solution>();
  const successNotify = (text: string) => toast.success(text);
  const errorNotify = (text: string) => toast.error(text);
  const clearContext = () => {
    setJobs([]);
    setVehicles([]);
    setSolution(undefined);
  };
  const ManageJob = (job: Job, key: Key) => {
    if (key === Key.Add) {
      setJobs((prev) => [...prev, job]);
    } else if (key === Key.Delete) {
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
    }
  };
  const ManageVehicle = (
    vehicle: Vehicle,
    key: Key,
    start?: number[],
    end?: number[]
  ) => {
    if (key === Key.Add) {
      setVehicles((prev) => [...prev, vehicle]);
    } else if (key === Key.Delete && canDelete(vehicles, errorNotify)) {
      // if vehicle has start & end and its the only one, we can either remove start or end.
      const vehicleToUpdate = vehicles.find((v) => v.id === vehicle.id);
      if (vehicleToUpdate) {
        if (start) {
          delete vehicleToUpdate.start;
        } else if (end) {
          delete vehicleToUpdate.end;
        }

        if (vehicleToUpdate.start || vehicleToUpdate.end) {
          setVehicles((prev) => [
            ...prev.filter((v) => v.id !== vehicle.id),
            vehicleToUpdate,
          ]);
        } else {
          setVehicles((prev) => [...prev.filter((v) => v.id !== vehicle.id)]);
        }
      }
    }
  };

  return (
    <RoutingContext.Provider
      value={{
        vehicles,
        jobs,
        setJobs,
        setVehicles,
        solution,
        setSolution,
        clearContext,
        ManageJob,
        ManageVehicle,
        toasters: { successToaster: successNotify, errorToaster: errorNotify },
      }}
    >
      {children}
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={2000}
      />
    </RoutingContext.Provider>
  );
};

export default RoutingWrapper;
