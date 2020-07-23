import React, {Component} from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { API_ROOT } from '../constants';

class Login extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch(`${API_ROOT}/login`, {
          method: "POST",
          body: JSON.stringify({
            username: values.username,
            password: values.password
          })
        }).then((res) => {
          if (res.ok) {
            return res.text();
          }
          throw new Error(res.text());
        }).then((data) => {
          this.props.handleLoginSucceed(data);
          message.success("Login successful");
        }).catch((err) => {
          console.log(err);
          message.error("Login Failed");
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return(
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "Please enter your username"
              }
            ]
          })(<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />} />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please enter your password"
              }
            ]
          })(<Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">Login</Button> or 
          <Link to="/register"> register now</Link>
        </Form.Item>
      </Form>
    )
  }
}

const LoginForm = Form.create({ name: "login"})(Login);
export default LoginForm;