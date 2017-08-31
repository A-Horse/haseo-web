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

class ProjectDetail extends Component {
  render() {
    const { project } = this.props;
    console.log(project);

    if (project) {
      return (
        <div className="project-detail">
          <div>
            {project.name}
          </div>

          <div className="flows-output">
            {project.status.flowsOutput.map((flowOutputUnit, i) =>
              <div className="flows-output--unit" key={i}>
                <span>
                  {flowOutputUnit.flowName}:
                </span>
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

export default withRouter(connect(mapStateToProps)(toJS(ProjectDetail)));
