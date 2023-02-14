import Job from "./Job";
import { Step } from "./Step";

type Summary = {
  cost: number,
  routes: number,
  unassigned: number,
  service: any,
  duration: any,
  waiting_time: any,
  priority: number,
  violations: any[],
  distance: number
}

type Route = {
  vehicle: number,
  steps: Step,
  cost: number,
  service: number,
  duration: number,
  priority: number,
  violations: any[],
  description: string,
  geometry: string,
  distance: number
}
export type Solution = {
  code: number;
  error: string,
  summary: Summary,
  unassigned: Job[]
  routes: Route[]
};
