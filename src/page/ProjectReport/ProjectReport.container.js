// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';
import { withRouter, Link } from 'react-router-dom';
import { makeActionRequestCollection } from '../../action/actions';
import { Map, List } from 'immutable';
import { Collapse, Tag, Icon } from 'antd';
import { format } from 'date-fns';
import toJS from '../../util/immutable-to-js';
import { MappingService } from '../../service/mapping.service';

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

  componentWillReceiveProps(newProps) {
    const { projectName, reportId } = this.props.match.params;
    if (
      !R.path(['report', 'commitMessage'], newProps) &&
      R.path(['report', 'commitHash'], newProps)
    ) {
      this.props.actions.WS_GET_PROEJCT_COMMIT_MESSAGE_REQUEST({
        name: projectName,
        commitHash: newProps.report.commitHash,
        reportId
      });
    }
  }

  render() {
    const { project, report } = this.props;
    return (
      <div className="proejct-report-page">
        <Layout>
          <Layout>
            <Content>
              <section className="project-report--infomation">
                <h3>
                  <Icon type="info-circle" />Report Infomation
                </h3>
                <dl>
                  <dt>
                    <Icon type="file" />Project Name
                  </dt>
                  <dd>{project && project.name}</dd>
                </dl>

                <dl>
                  <dt>
                    <Icon type="clock-circle-o" />Run Date
                  </dt>
                  <dd>{report && format(report.startDate, 'YYYY-MM-DD: HH:mm:ss')}</dd>
                </dl>

                <dl>
                  <dt>
                    <Icon type="github" />Commit
                  </dt>
                  <dd>{report && report.commitHash}</dd>
                </dl>

                <dl>
                  <dt>
                    <Icon type="github" />Commit Message
                  </dt>
                  <dd>{report && report.commitMessage}</dd>
                </dl>

                <dl>
                  <dt>
                    <Icon type="profile" />Status
                  </dt>
                  <dd>
                    {report && (
                      <Tag
                        color={R.cond([
                          [R.equals('FAILURE'), R.always('red')],
                          [R.equals('SUCCESS'), R.always('green')],
                          [R.T, () => R.always('')]
                        ])(report.status)}
                      >
                        {MappingService.map(report.status)}
                      </Tag>
                    )}
                  </dd>
                </dl>
              </section>

              <section>
                <h3>Console Output</h3>
                {report && (
                  <Collapse>
                    {report.result.map((flowResult: FlowResult, index: number) => (
                      <Panel header={<div>{flowResult.flowName}</div>} key={index}>
                        <div className="flow-result--output-container">
                          {flowResult.result.map(
                            (flowOutputUnit: FlowOutputUnit, index: number) => (
                              <span
                                className={`flow-output-unit ${flowOutputUnit.type}`}
                                key={index}
                              >
                                {flowOutputUnit.data}
                              </span>
                            )
                          )}
                        </div>
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
