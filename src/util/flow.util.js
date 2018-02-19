// @flow
import { Map } from 'immutable';

export function generateFlowLine(project: Map<Project>, report: Map<ProjectReport>): Map<FlowLine> {
  const flows: Map<Flow> = project
    .get('flows')
    .map(
      (flow: Map<Flow>, index: number): Map<Flow> =>
        report
          ? flow.update(
              'status',
              (status: string) =>
                index < (report.get('result') && report.get('result').size)
                  ? report.getIn(['result', index, 'status'])
                  : status
            )
          : flow
    );

  return Map({
    project,
    report,
    flows
  });
}
