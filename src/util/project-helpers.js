// @flow
import R from 'ramda';

export function transformProject(project: ProjectData): Project {
  const flowsNameSeq = [];
  return {
    ...project,
    flowStates: project.flows.map((flow): FlowState => {
      const [flowName] = R.flatten([R.keys(flow), R.values(flow)]);
      flowsNameSeq.push(flowName);

      const isRunning = project.status.isRunning
        ? project.status.currentFlowName === flowName
        : false;

      const isWaitting =
        (project.status.isWaitting && !project.report.startDate) || // project 在等待或者没开始肯定是 waitting
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

      const status = isRunning
        ? 'RUNNING'
        : isWaitting ? 'WAITTING' : isSuccess ? 'SUCCESS' : 'FAILURE';

      return {
        name: flowName,
        status: status
      };
    })
  };
}
