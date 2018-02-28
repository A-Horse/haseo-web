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
import { List as AntList, Icon, Button } from 'antd';

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
    project,
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
  project: Project,
  match: any
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
    const { flowLines, project } = this.props;
    return (
      <div>
        <Layout>
          <Sider className="project-detail--slider">
            <ul>
              <li>
                <Icon type="right-circle-o" />
                <Button size="small">Run it</Button>
              </li>

              <li>
                <Icon type="code-o" />
                <a href="">Haseo config</a>
              </li>

              <li>
                <Icon type="clock-circle" />
                <a href="">Changes</a>
              </li>
            </ul>
          </Sider>

          <Layout>
            <Content>
              <h3>
                <Icon type="link" />
                <span> {project && project.name}</span>
              </h3>
              <div className="project-detail--history-list-container">
                <AntList
                  header={
                    <div className="project-detail-history--header">
                      <Icon type="bars" />
                      <span>History:</span>
                    </div>
                  }
                  itemLayout="horizontal"
                  dataSource={flowLines}
                  renderItem={flowLine => (
                    <AntList.Item className="project-detail-history--item">
                      <div className="project-detail-history--item-id">
                        <Link to={`/project/${flowLine.project.name}/${flowLine.report.id}`}>
                          <Button shape="circle" type="primary" size="small">
                            {flowLine.report.id}
                          </Button>
                        </Link>
                      </div>
                      <ProjectFlows key={flowLine.report.id} flows={flowLine.flows} />
                    </AntList.Item>
                  )}
                />
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(ProjectDetail)));
