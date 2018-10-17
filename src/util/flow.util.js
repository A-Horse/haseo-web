// @flow
import { Map } from 'immutable';

export function generateFlowLine(project: Map<Project>, report: Map<ProjectReport>): Map<FlowLine> {
  let rawFlows;
  if (report) {
    rawFlows = report.get('flows');
  } else {
    rawFlows = project.get('flows');
  }
  const flows: Map<Flow> = rawFlows.map((flow: Map<Flow>, index: number): Map<Flow> => {
    if (!report) {
      return flow;
    }
    return flow.update(
      'status',
      (status: string) =>
        index < (report.get('result') && report.get('result').size) ? report.getIn(['result', index, 'status']) : status
    );
  });

  return Map({
    project,
    report,
    flows
  });
}
