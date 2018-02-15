// @flow

declare type FlowStatus = 'INITAL' | 'RUNNING' | 'WAITTING' | 'SUCCESS' | 'FAILURE';

declare type ProjectStatus = 'INITAL' | 'RUNNING' | 'WAITTING' | 'SUCCESS' | 'FAILURE'

declare interface FlowDescription {
  [string]: string;
}

declare interface Flow {
  name: string;
  command: string;
  status: FlowStatus;
}

declare interface Project {
  name: string;
  flows: Flow[];
  status: ProjectStatus;
}

declare interface ProjectBase {
  flows: Array<{ [string]: string }>;
  name: string;
}

declare interface ProjectReport {
  id: number;
  commitHash: string;
  projectName: string;
  repoPullOutput: string;
  startDate: Date;
  result: string;
}
