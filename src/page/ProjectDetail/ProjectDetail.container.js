// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';
const { Content, Sider } = Layout;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { makeActionRequestCollection } from '../../action/actions';
import { Link } from 'react-router-dom';
import Actions from '../../action/actions';
import toJS from '../../util/immutable-to-js';
import { Map, List } from 'immutable';
import { generateFlowLine } from '../../util/flow.util';
import { List as AntList, Icon, Button } from 'antd';

import './ProjectDetail.less';

import ProjectHistory from './ProjectHistory/ProjctHistory';
import ProjectStatus from './ProjectStatus/ProjectStatus';

const mapStateToProps = (state, props: { match: { params: { projectName: string } } }) => {
  const { projectName } = props.match.params;

  const reports: List<ProjectReport> = state.detail.get('reports');
  const project: Map<Project> = state.project.getIn(['projects']).find(project => project.get('name') === projectName);

  const flowLines: List<FlowLine> = project ? reports.map(report => generateFlowLine(project, report)) : List();

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
    this.props.actions.WS_GET_PROJECT_REQUEST({ name: projectName });
  }

  render() {
    const { project } = this.props;
    const { projectName } = this.props.match.params;

    return (
      <div>
        <Layout>
          <Sider className="project-detail--slider">
            <ul>
              <li>
                <Icon type="right-circle-o" />
                <Button
                  size="small"
                  onClick={() =>
                    this.props.actions.WS_START_PROJECT_FLOW_REQUEST({
                      name: this.props.match.params.projectName
                    })
                  }
                >
                  Run it
                </Button>
              </li>

              <li>
                <Icon type="code-o" />
                <Link to={`/project/${projectName}/status`}>Status</Link>
              </li>

              <li>
                <Icon type="code-o" />
                <Link to={`/project/${projectName}/history`}>Haseo config</Link>
              </li>

              <li>
                <Icon type="clock-circle" />
                <Link to={`/project/${projectName}/history`}>History</Link>
              </li>
            </ul>
          </Sider>

          <Layout>
            <Content>
              <h3>
                <Icon type="link" />
                <span> {project && project.name}</span>
              </h3>

              <Switch>
                <Route path="/project/:projectName/status" component={ProjectStatus} />
                <Route path="/project/:projectName/history" component={ProjectHistory} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(ProjectDetail))
);
