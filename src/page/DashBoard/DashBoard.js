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

import 'rxjs/add/operator/take';

import './DashBoard.less';

import DI from '../../service/di';
import { EpicAdapterService } from '../../service/epic-adapter.service';

import { DashBoardProject } from './DashBoardProject/DashBoardProject';

const mapStateToProps = state => {
  const projects = state.project.get('projects');
  return {
    projects
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

class DashBoard extends Component<{
  actions: Object,
  projects: Project[]
}> {
  componentWillMount() {
    const epicApterService: EpicAdapterService = DI.get(EpicAdapterService);

    epicApterService.input$
      .ofType(Actions.WS_GET_PROJECTS.SUCCESS)
      .take(1)
      .subscribe((action: FSAction) => {
        const projects: ProjectBase[] = action.payload;
        projects.forEach((project: ProjectBase) => {
          this.props.actions.WS_GET_PROJECT_LAST_REPORT_REQUEST({ name: project.name });
        });
      });

    this.props.actions.WS_GET_PROJECTS_REQUEST();
  }

  render() {
    const { projects } = this.props;
    return (
      <div className="dashboard">
        <div className="project-list">
          {projects.map((project: Project) => (
            <div key={project.name}>
              <DashBoardProject actions={this.props.actions} project={project} />
              <Divider />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(DashBoard)));
