import React, { Component } from 'react';
import { Layout } from 'antd';
const { Header, Content, Sider } = Layout;
import { connect } from 'react-redux';
import R from 'ramda';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../action/actions';

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

class ProjectDetail extends Component {
  componentWillMount() {
    const { projectName } = this.props.match.params;
    this.props.actions.GET_PROJECT({ projectName });
  }

  render() {
    const { project } = this.props;

    if (project) {
      return (
        <div>
          <Layout>
            <Sider />

            <Layout>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                Content
              </Content>
            </Layout>
          </Layout>
        </div>
      );
    }
    return <div>loading........</div>;
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectDetail));
