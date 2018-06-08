// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import toJS from '../../util/immutable-to-js';
import { makeActionRequestCollection } from '../../action/actions';
import Actions from '../../action/actions';
import type { Dispatch } from 'redux';
import { Divider } from 'antd';
import { Map, List } from 'immutable';
import { generateFlowLine } from '../../util/flow.util';

import 'rxjs/add/operator/take';

import './DashBoard.less';

import DI from '../../service/di';
import { EpicAdapterService } from '../../service/epic-adapter.service';
import { DashBoardFlowLine } from './DashBoardFlowLine/DashBoardFlowLine';

const mapStateToProps = state => {
  const projects = state.project.get('projects');

  const flowLines = projects.map((project: Map<Project>): Map<FlowLine> => {
    const report: Map<ProjectReport> = state.report
      .get(project.get('name'), List())
      .sort(
        (r1: Map<ProjectReport>, r2: Map<ProjectReport>) =>
          r1.get('startDate') < r2.get('startDate')
      )
      .filter((report: Map<ProjectReport>): boolean => report.get('status') !== 'WAITTING')
      .first();

    return generateFlowLine(project, report);
  });

  return {
    flowLines
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

class DashBoard extends Component<{
  actions: Object,
  flowLines: FlowLine[]
}> {
  componentWillMount() {
    const epicApterService: EpicAdapterService = DI.get(EpicAdapterService);

    epicApterService.input$
      .ofType(Actions.WS_GET_SIMPLE_PROJECTS.SUCCESS)
      .take(1)
      .subscribe((action: FSAction) => {
        const projects: ProjectBase[] = action.payload;
        projects.forEach((project: ProjectBase) => {
          this.props.actions.WS_GET_PROJECT_LAST_REPORT_REQUEST({ name: project.name });
        });
      });

    this.props.actions.WS_GET_SIMPLE_PROJECTS_REQUEST();
  }

  render() {
    const { flowLines } = this.props;
    return (
      <div className="dashboard">
        <div className="project-list">
          {flowLines.map((flowLine: FlowLine) => (
            <div key={flowLine.project.name}>
              <DashBoardFlowLine actions={this.props.actions} flowLine={flowLine} />
              <Divider />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(DashBoard)));
