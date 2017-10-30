import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { withRouter } from 'react-router-dom';
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

class ProjectOuput extends Component {
  render() {
    const { project } = this.props;

    if (project) {
      return (
        <div className="project-detail">
          <h1>
            {project.name}
          </h1>

          <div className="flows-output">
            {project.status.flowsOutput.map((flowOutputUnit, i) =>
              <div className="flows-output--unit" key={i}>
                <h3>
                  <span>{flowOutputUnit.flowName}:</span>
                  &nbsp;&nbsp;
                  <span>{R.mergeAll(project.flows)[flowOutputUnit.flowName]}</span>
                </h3>

                <hr />
                <div>
                  {flowOutputUnit.output.map((ouputFragment, i) =>
                    <span className={`flows-output--fragment ${ouputFragment.type}`} key={i}>
                      {ouputFragment.text}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
    return <div>loading........</div>;
  }
}

export default withRouter(connect(mapStateToProps)(toJS(ProjectOuput)));
