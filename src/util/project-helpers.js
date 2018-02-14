// @flow
import R from 'ramda';

function getKVfromFlowDescriptionMap(flow): [string, string] {
  // $flow-ignore
  return R.flatten([R.keys(flow), R.values(flow)]);
}

function generateStatusByDoing(
  isRunning: boolean,
  isSuccess: boolean,
  isWaitting: boolean
): FlowStatus {
  return isRunning ? 'RUNNING' : isWaitting ? 'WAITTING' : isSuccess ? 'SUCCESS' : 'FAILURE';
}

export function generateFlowStatesToProject(project: ProjectData): ProjectWithFlowStates {
  const flowsNameSeq = [];
  return {
    ...project,
    flowStates: project.flows.map((flow): FlowState => {
      const [flowName] = getKVfromFlowDescriptionMap(flow);
      flowsNameSeq.push(flowName);

      const isRunning = project.status.isRunning
        ? project.status.currentFlowName === flowName
        : false;

      const isWaitting: boolean =
        (!!project.status.isWaitting && !project.report.startDate) || // project 在等待或者没开始肯定是 waitting
        (!isRunning &&
          flowsNameSeq.indexOf(project.status.currentFlowName) < flowsNameSeq.indexOf(flowName) &&
          flowsNameSeq.indexOf(project.status.currentFlowName) > -1) || // 进行中状态之前肯定是 waitting
        (flowsNameSeq.indexOf(flowName) > flowsNameSeq.indexOf(project.report.flowErrorName) &&
          flowsNameSeq.indexOf(project.report.flowErrorName) > -1); // 错误 flow 之后是 waitting

      const isSuccess = isRunning
        ? false
        : project.report.flowErrorName !== flowName &&
          (flowsNameSeq.indexOf(project.report.flowErrorName) < 0
            ? true
            : flowsNameSeq.indexOf(project.report.flowErrorName) >= flowsNameSeq.indexOf(flowName));

      const status = generateStatusByDoing(isRunning, isSuccess, isWaitting);

      return {
        name: flowName,
        status
      };
    })
  };
}

export function makeFlowStatesByProjectAndReport(
  project: ProjectData,
  projectReport: ProjectReport
): Array<FlowState> {
  const { flowErrorName } = projectReport;

  const flowNameSeq = project.flows.map(flow => R.first(getKVfromFlowDescriptionMap(flow)));

  return project.flows.map((flow): FlowState => {
    const [flowName] = getKVfromFlowDescriptionMap(flow);

    const isRunning = false;
    const isSuccess =
      !flowErrorName ||
      (!!flowErrorName && flowNameSeq.indexOf(flowName) < flowNameSeq.indexOf(flowErrorName));
    const isWaitting =
      !!flowErrorName && flowNameSeq.indexOf(flowName) > flowNameSeq.indexOf(flowErrorName);

    const status = generateStatusByDoing(isRunning, isSuccess, isWaitting);

    return {
      name: flowName,
      status
    };
  });
}
