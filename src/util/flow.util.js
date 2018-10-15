// @flow
import { Map } from 'immutable';

export function generateFlowLine(project: Map<Project>, report: Map<ProjectReport>): Map<FlowLine> {
  console.log(report);
  const flows: Map<Flow> = report.get('flows').map((flow: Map<Flow>, index: number): Map<Flow> => {
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
