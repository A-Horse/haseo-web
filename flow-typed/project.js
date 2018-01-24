// @flow

declare interface FlowState {
  name: string;
  status: 'RUNNING' | 'WAITTING' | 'SUCCESS' | 'FAILURE'
}

declare interface ProjectData {
  flows: Array<{[string]: string}>;
  name: string;
  status: any;
  report: ProjectReport;
}

declare interface Project extends ProjectData {
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
