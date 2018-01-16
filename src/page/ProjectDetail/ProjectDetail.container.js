import React, { Component } from 'react';
import { Layout } from 'antd';
const { Header, Content, Sider } = Layout;
import { connect } from 'react-redux';
import R from 'ramda';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../action/actions';
import { Link } from 'react-router-dom';
import toJS from '../../util/immutable-to-js';

import './ProjectDetail.scss';

const mapStateToProps = (state, props) => {
  const { projectName } = props.match.params;
  const project = state.projects
    .get('items')
    .toList()
    .find(project => project.get('name') === projectName);

  const reportHistoryList = project ? project.get('buildReportHistory') : [];
  return {
    project,
    reportHistoryList: reportHistoryList || []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

class ProjectDetail extends Component {
  componentWillMount() {
    const { projectName } = this.props.match.params;
    this.props.actions.WS_GET_PROJECT_DETAIL_REQUEST({ name: projectName });
  }

  render() {
    const { project } = this.props;
    if (!project) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <Layout>
          <Sider>
            <ul>
              {this.props.reportHistoryList.map(reportHistroy => {
                 return (
                   <li key={reportHistroy.id}>
                     <Link to={`./${this.props.match.params.projectName}/${reportHistroy.id}`}>{reportHistroy.id}</Link>
                   </li>
                 );
              })}
            </ul>
          </Sider>

          <Layout>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              Content
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(ProjectDetail)));
