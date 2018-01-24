// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { makeActionRequestCollection } from '../../action/actions';
import toJS from '../../util/immutable-to-js';

import './index.scss';

const mapStateToProps = (state, props) => {
  const { projectName } = props.match.params;
  return {
    project: R.find(project => project.get('name') === projectName)(
      state.projects.get('items').toList()
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

class ProjectOuput extends Component<{
  actions: Object,
  project: Object,
  match: Object
}> {
  componentWillMount() {
    const { projectName, projectReportId } = this.props.match.params;
    this.props.actions.WS_GET_PROJECT_REPORT_REQUEST({
      name: projectName,
      reportId: projectReportId
    });
  }

  render() {
    const { project } = this.props;

    if (project) {
      return (
        <div className="project-detail">
          <h1>{project.name}</h1>

          <div className="flows-output">
            {project.status.flowsOutput.map((flowOutputUnit, i) => (
              <div className="flows-output--unit" key={i}>
                <h3>
                  <span>{flowOutputUnit.flowName}:</span>
                  &nbsp;&nbsp;
                  <span>{R.mergeAll(project.flows)[flowOutputUnit.flowName]}</span>
                </h3>

                <hr />
                <div>
                  {flowOutputUnit.output.map((ouputFragment, i) => (
                    <span className={`flows-output--fragment ${ouputFragment.type}`} key={i}>
                      {ouputFragment.text}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return <div>loading........</div>;
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(ProjectOuput)));
