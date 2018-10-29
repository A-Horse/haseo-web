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
import Highlight from 'react-highlight';
import type { Match } from 'react-router';

import './ProjectConfig.less';
import '../../../../node_modules/highlight.js/styles/a11y-light.css';

const mapStateToProps = (state, props: { match: { params: { projectName: string } } }) => {
  const { projectName } = props.match.params;

  return {
    configSource: state.project.getIn(['projectConfig', projectName])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

class ProjectConfig extends Component<{
  actions: { [string]: Function },
  project: Project,
  match: Match,
  configSource: string
}> {
  componentWillMount() {
    const { projectName } = this.props.match.params;

    this.props.actions.WS_GET_PROJECT_CONFIG_REQUEST({
      name: projectName
    });
  }

  render() {
    return (
      <div className="project-config-container">
        <Highlight className="yaml">{this.props.configSource}</Highlight>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(ProjectConfig))
);
