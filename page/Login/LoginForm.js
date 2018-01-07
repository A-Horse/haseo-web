import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class LoginForm extends Component {
  state = {
    errorMessage: ''
  };

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    if (!newProps.isLoginSuccess && newProps.loginError) {
      if (newProps.loginError.type === 'AuthError') {
        return this.setState({ errorMessage: 'Username or Password not match.' });
      }
      return this.setState({ errorMessage: 'Unknown Error' });
    }
    return this.state.errorMessage && this.setState({ errorMessage: '' });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(this.props.form.getFieldsValue());
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
             rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <div>
            <div>{this.state.errorMessage}</div>
          </div>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
