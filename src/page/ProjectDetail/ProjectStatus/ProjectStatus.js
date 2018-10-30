// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';
const { Content, Sider } = Layout;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../../action/actions';
import { Link } from 'react-router-dom';
import Actions from '../../../action/actions';
import toJS from '../../../util/immutable-to-js';
import { Map, List } from 'immutable';
import { List as AntList, Icon, Button } from 'antd';

import './ProjectStatus.less';

const mapStateToProps = (state, props: { match: { params: { projectName: string } } }) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

class ProjectStatus extends Component<{
  actions: { [string]: Function },
  flowLines: FlowLine[],
  project: Project,
  match: any
}> {
  componentWillMount() {
    const { projectName } = this.props.match.params;

    this.props.actions.WS_GET_PROJECT_REQUEST({ name: projectName });
  }

  render() {
    return (
      <div>
        Status
        <div>
          last build:
          <dl>
            <dt>
              <Icon type="file" />
              build status:
            </dt>
            <dd>{'RUNNING'}</dd>
          </dl>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(ProjectStatus))
);
