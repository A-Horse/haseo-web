// @flow

declare type FlowStatus = 'RUNNING' | 'WAITTING' | 'SUCCESS' | 'FAILURE';

declare interface FlowState {
  name: string;
  status: FlowStatus;
}

declare interface Project {
  flows: Array<{ [string]: string }>;
  name: string;
}

declare interface ProjectBase {
  flows: Array<{ [string]: string }>;
  name: string;
}

declare interface ProjectStatus {
  currentFlowName?: string;
  isRunning: boolean;
  isSuccess: boolean;
}

declare interface ProjectReport {
  id: number;
  commitHash: string;
  projectName: string;
  repoPullOutput: string;
  startDate: Date;
  result: string;
}
