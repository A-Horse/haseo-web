// @flow
import { values, keys, flatten } from 'ramda';

export function getFlowFromFlowDescriptionMap(flow: FlowDescription): [string, string] {
  // $flow-ignore
  return flatten([keys(flow), values(flow)]);
}

export function transformFlowDescriptionMap(flow: FlowDescription): Flow {
  const [name, command] = getFlowFromFlowDescriptionMap(flow);
  return {
    name,
    command,
    status: 'INITAL'
  };
}
