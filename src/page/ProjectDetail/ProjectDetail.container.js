// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';
const { Content, Sider } = Layout;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../action/actions';
import { Link } from 'react-router-dom';
import Actions from '../../action/actions';
import toJS from '../../util/immutable-to-js';
import { Map, List } from 'immutable';
import { ProjectFlows } from '../../component/ProjectFlow/ProjectFlows';
import { generateFlowLine } from '../../util/flow.util';

import './ProjectDetail.less';

import DI from '../../service/di';
import { EpicAdapterService } from '../../service/epic-adapter.service';

const mapStateToProps = (state, props: { match: { params: { projectName: string } } }) => {
  const { projectName } = props.match.params;

  const reports: List<ProjectReport> = state.detail.get('reports');
  const project: Map<Project> = state.project
    .getIn(['projects'])
    .find(project => project.get('name') === projectName);

  const flowLines: List<FlowLine> = project
    ? reports.map(report => generateFlowLine(project, report))
    : List();

  return {
    flowLines
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

class ProjectDetail extends Component<{
  actions: { [string]: Function },
  flowLines: FlowLine[],
  match: any,
  reportHistoryList: any
}> {
  componentWillMount() {
    const { projectName } = this.props.match.params;

    const epicApterService: EpicAdapterService = DI.get(EpicAdapterService);

    epicApterService.input$
      .ofType(Actions.WS_GET_PROJECT.SUCCESS)
      .take(1)
      .subscribe(() => {
        this.props.actions.WS_GET_PROJECT_REPORT_HISTORY_REQUEST({
          name: projectName,
          offset: 0,
          limit: 10
        });
      });

    this.props.actions.WS_GET_PROJECT_REQUEST({ name: projectName });
  }

  render() {
    const { flowLines } = this.props;
    return (
      <div>
        <Layout>
          <Sider>Sider</Sider>

          <Layout>
            <Content>
              {flowLines.map(flowLine => (
                <ProjectFlows key={flowLine.report.id} flows={flowLine.flows} />
              ))}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(ProjectDetail)));
