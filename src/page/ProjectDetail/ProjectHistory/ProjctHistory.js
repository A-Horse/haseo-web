// @flow
import React, { Component } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../../action/actions';
import { Link } from 'react-router-dom';
import toJS from '../../../util/immutable-to-js';
import { Map, List } from 'immutable';
import { ProjectFlowProcess } from '../../../component/ProjectFlow/ProjectFlowProcess';
import { generateFlowLine } from '../../../util/flow.util';
import { List as AntList, Icon, Button } from 'antd';
import type { Match } from 'react-router';

import './ProjectHistory.less';

const mapStateToProps = (state, props: { match: { params: { projectName: string } } }) => {
  const { projectName } = props.match.params;

  const reports: List<ProjectReport> = state.detail.get('reports');
  const project: Map<Project> = state.project.getIn(['projects']).find(project => project.get('name') === projectName);

  const isLoading = !reports || !project;

  const flowLines: List<FlowLine> = !isLoading ? reports.map(report => generateFlowLine(project, report)) : List();

  return {
    project,
    flowLines,
    isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

class ProjectHistory extends Component<{
  actions: { [string]: Function },
  flowLines: FlowLine[],
  project: Project,
  match: Match,
  isLoading: boolean
}> {
  componentWillMount() {
    const { projectName } = this.props.match.params;

    this.props.actions.WS_GET_PROJECT_REPORT_HISTORY_REQUEST({
      name: projectName,
      offset: 0,
      limit: 10
    });
  }

  render() {
    const { flowLines, isLoading } = this.props;

    return (
      <div>
        <div className="project-detail--history-list-container">
          <AntList
            header={
              <div className="project-detail-history--header">
                <Icon type="bars" />
                <span>History:</span>
              </div>
            }
            loading={isLoading}
            itemLayout="horizontal"
            dataSource={flowLines}
            renderItem={flowLine => {
              const status = flowLine.report ? flowLine.report.status : 'INITAL';

              return (
                <AntList.Item className="project-detail-history--item">
                  <div className="project-detail-history--item-id">
                    <Link to={`/project/${flowLine.project.name}/report/${flowLine.report.id}`}>
                      <Button shape="circle" type="primary" size="small">
                        {flowLine.report.id}
                      </Button>
                    </Link>
                  </div>
                  <ProjectFlowProcess status={status} key={flowLine.report.id} flows={flowLine.flows} />
                </AntList.Item>
              );
            }}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(ProjectHistory))
);
