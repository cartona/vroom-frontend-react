import Vehicle from "../models/Vehicle"
export const canDelete = (vehicles: Vehicle[], errorNotify: any)=>{
  if (vehicles.length === 1){
    const vehicle = vehicles[0]
    if (vehicle.start && vehicle.end){
      return true
    }
    errorNotify("At least 1 vehicle's start or end needs to be provided.")
    return false
  }
  return true
}
