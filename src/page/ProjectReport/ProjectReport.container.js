// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { makeActionRequestCollection } from '../../action/actions';
import { Map, List } from 'immutable';
import toJS from '../../util/immutable-to-js';

import './ProjectReport.scss';

const { Header, Content, Sider } = Layout;

const mapStateToProps = (state, props) => {
  const { projectName, reportId } = props.match.params;
  const project: Map<Project> = state.project
    .getIn(['projects'])
    .find(project => project.get('name') === projectName);

  const report: Map<ProjectReport> = state.report
    .getIn([projectName], List())
    .find(report => report.get('id').toString() === reportId);
  console.log(project, report);

  return { project, report };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

class ProjectReport extends Component<{
  actions: { [string]: Function },
  project: Project,
  report: ProjectReport,
  match: Object
}> {
  componentWillMount() {
    const { projectName, reportId } = this.props.match.params;
    this.props.actions.WS_GET_PROJECT_REPORT_REQUEST({
      id: reportId
    });
    this.props.actions.WS_GET_PROJECT_REQUEST({ name: projectName });
  }

  render() {
    const { project, report } = this.props;
    return (
      <div>
        <Layout>
          <Layout>
            <Content>
              <section>
                {report && (
                  <div>
                    {report.result.map((flowResult: FlowResult, index: number) => (
                      <div key={index}>
                        {flowResult.result.map((flowOutputUnit: FlowOutputUnit, index: number) => (
                          <span key={index}>{flowOutputUnit.data}</span>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(ProjectReport)));
