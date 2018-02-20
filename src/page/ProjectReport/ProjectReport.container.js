// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { makeActionRequestCollection } from '../../action/actions';
import toJS from '../../util/immutable-to-js';

import './ProjectReport.scss';

const { Header, Content, Sider } = Layout;

const mapStateToProps = (state, props) => {
  const { projectName } = props.match.params;

  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

class ProjectReport extends Component<{
  actions: Object,
  project: Object,
  match: Object
}> {
  componentWillMount() {
    const { projectName, reportId } = this.props.match.params;
    this.props.actions.WS_GET_PROJECT_REPORT_REQUEST({
      id: reportId
    });
  }

  render() {
    const { project } = this.props;
    return (
      <div>
        <Layout>
          <Layout>
            <Content>hi</Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(ProjectReport)));
