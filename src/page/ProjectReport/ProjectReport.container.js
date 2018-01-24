// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { makeActionRequestCollection } from '../../action/actions';
import toJS from '../../util/immutable-to-js';

import './ProjectReport.scss';

const { Header, Content, Sider } = Layout;

const mapStateToProps = (state, props) => {
  const { projectName } = props.match.params;
  const project = state.projects
    .get('items')
    .toList()
    .find(project => project.get('name') === projectName);

  return {
    project
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

class ProjectReport extends Component<{
  actions: Object,
  project: Object,
  match: Object
}> {
  componentWillMount() {
    const { projectName, projectReportId } = this.props.match.params;
    this.props.actions.WS_GET_PROJECT_DETAIL_REQUEST({ name: projectName });
    this.props.actions.WS_GET_PROJECT_REPORT_REQUEST({
      name: projectName,
      reportId: projectReportId
    });
  }

  render() {
    const { project } = this.props;
    if (!project) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <Layout>
          <Layout>
            <Content>
              <div>
                <Link to={`${this.props.match.params.projectReportId}/output`}>output</Link>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(ProjectReport)));
