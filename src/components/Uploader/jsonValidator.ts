import Job from "../../models/Job";
import Vehicle from "../../models/Vehicle";

type validator = {
  message?: string;
  valid: boolean;
};
const jsonValidator = (content: any): validator => {
  if (!content.jobs || !content.vehicles) {
    return {
      valid: false,
      message:
        "The File specified is missing either the jobs or vehicles field.",
    };
  }
  const jobValidation = validateJobLocation(content.jobs);
  if (!jobValidation.valid) {
    return jobValidation;
  }
  const vehicleValidation = validateVehicleStartEnd(content.vehicles);
  if (!vehicleValidation.valid) {
    return vehicleValidation;
  }
  return { valid: true };
};
const validateJobLocation = (jobs: Job[]) => {
  for (let i = 0; i < jobs.length; i++) {
    if (!jobs[i].location || jobs[i].location.length !== 2) {
      return {
        valid: false,
        message: `Job${jobs[i].id} has wrong location arguments`,
      };
    }
    if (!jobs[i].id) {
      return {
        valid: false,
        message: `Job of index ${i} has no id.`,
      };
    }
  }
  return { valid: true };
};

const validateVehicleStartEnd = (vehicles: Vehicle[]) => {
  for (let i = 0; i < vehicles.length; i++) {
    if (!vehicles[i].start && !vehicles[i].end) {
      return {
        valid: false,
        message: `Vehicle${vehicles[i].id} has no start or end`,
      };
    }

    if (!vehicles[i].id) {
      return {
        valid: false,
        message: `Vehicle of index ${i} has no id.`,
      };
    }
  }

  return { valid: true };
};

export default jsonValidator;
