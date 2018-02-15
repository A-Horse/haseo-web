// @flow
import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { ErrorText } from '../../component/feedback/ErrorText/ErrorText';

class LoginForm extends Component<{
  loginErrorMessage: string,
  isLoginSuccess: boolean,
  loginFn: Function,
  form: any
}> {
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(err => {
      if (!err) {
        this.props.loginFn(this.props.form.getFieldsValue());
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(<Input prefix={<Icon type="user" />} placeholder="Username" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(<Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Login
          </Button>
          {this.props.loginErrorMessage && <ErrorText>{this.props.loginErrorMessage}</ErrorText>}
        </Form.Item>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
