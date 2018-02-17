// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';
const { Content, Sider } = Layout;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../action/actions';
import { Link } from 'react-router-dom';
import Actions from '../../action/actions';
import toJS from '../../util/immutable-to-js';

import './ProjectDetail.less';

import DI from '../../service/di';
import { EpicAdapterService } from '../../service/epic-adapter.service';

const mapStateToProps = (state, props: { match: { params: { projectName: string } } }) => {
  const { projectName } = props.match.params;

  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

class ProjectDetail extends Component<{
  actions: { [string]: Function },
  project: Project,
  match: any,
  reportHistoryList: any
}> {
  componentWillMount() {
    const { projectName } = this.props.match.params;

    const epicApterService: EpicAdapterService = DI.get(EpicAdapterService);

    epicApterService.input$
      .ofType(Actions.WS_GET_PROJECT.SUCCESS)
      .take(1)
      .subscribe(() => {
        this.props.actions.WS_GET_PROJECT_REPORT_HISTORY_REQUEST({
          name: projectName,
          offset: 0,
          limit: 10
        });
      });

    this.props.actions.WS_GET_PROJECT_REQUEST({ name: projectName });
  }

  render() {
    const { project } = this.props;
    if (!project) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <Layout>
          <Sider>Sider</Sider>

          <Layout>
            <Content>
              <div>project.name</div>
              <ul>
                {this.props.reportHistoryList.map(reportHistroy => {
                  return (
                    <li key={reportHistroy.id}>
                      <Link to={`./${this.props.match.params.projectName}/${reportHistroy.id}`}>
                        {reportHistroy.id}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(ProjectDetail)));
