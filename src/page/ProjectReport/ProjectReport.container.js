// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';
import { withRouter, Link } from 'react-router-dom';
import { makeActionRequestCollection } from '../../action/actions';
import { Map, List } from 'immutable';
import { Collapse } from 'antd';
import toJS from '../../util/immutable-to-js';

const Panel = Collapse.Panel;

import './ProjectReport.less';

const { Header, Content, Sider } = Layout;

const mapStateToProps = (state, props) => {
  const { projectName, reportId } = props.match.params;
  const project: Map<Project> = state.project
    .getIn(['projects'])
    .find(project => project.get('name') === projectName);

  const report: Map<ProjectReport> = state.report
    .getIn([projectName], List())
    .find(report => report.get('id').toString() === reportId);

  return { project, report };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

class ProjectReportPage extends Component<{
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
                <dl>
                  <dt>Project Name</dt>
                  <dd>{project && project.name}</dd>
                </dl>

                <dl>
                  <dt>Run Date</dt>
                  <dd>{report && report.startDate}</dd>
                </dl>
              </section>

              <section>
                <h3>Console Output</h3>
                {report && (
                  <Collapse>
                    {report.result.map((flowResult: FlowResult, index: number) => (
                      <Panel header={flowResult.flowName} key={index}>
                        <div className="flow-result--output-panel" />
                        {flowResult.result.map((flowOutputUnit: FlowOutputUnit, index: number) => (
                          <span key={index}>{flowOutputUnit.data}</span>
                        ))}
                      </Panel>
                    ))}
                  </Collapse>
                )}
              </section>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(ProjectReportPage)));
