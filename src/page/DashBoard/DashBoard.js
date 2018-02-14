// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import toJS from '../../util/immutable-to-js';
import DashBoardProjectItem from './Project';
import { makeActionRequestCollection } from '../../action/actions';
import Actions from '../../action/actions';
import type { Dispatch } from 'redux';

import 'rxjs/add/operator/take';

import './index.scss';

import DI from '../../service/di';
import { EpicAdapterService } from '../../service/epic-adapter.service';

const mapStateToProps = state => {
  const projects = state.projects.get('projects');
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
  projects: Array<any>
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
        {/* <div className="project-list">
            {projects.map(project => (
            <DashBoardProjectItem
            actions={this.props.actions}
            key={project.name}
            project={project}
            />
            ))}
            </div> */}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(DashBoard)));
