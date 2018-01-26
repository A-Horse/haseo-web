// @flow

declare type FlowStatus = 'RUNNING' | 'WAITTING' | 'SUCCESS' | 'FAILURE';

declare interface FlowState {
  name: string;
  status: FlowStatus;
}

declare interface ProjectData {
  flows: Array<{ [string]: string }>;
  name: string;
  status: ProjectStatus;
  report: ProjectReport;
}

declare interface ProjectStatus {
  currentFlowName?: string;
  isRunning: boolean;
  isSuccess: boolean;
}

declare interface ProjectWithFlowStates extends ProjectData {
  flowStates: Array<FlowState>;
}

declare interface ProjectReport {
  id?: number;
  projectName: string;
  flowErrorName: string;
  flowsOutput: Array<any>;
  isSuccess: boolean;
  newCommitDate: string;
  startDate: number;
}
