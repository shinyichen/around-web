import React from "react";
import { API_ROOT } from "../constants";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";

class Register extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleConfirmBlur = (event) => {
    const { value } = event.target;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch(`${API_ROOT}/signup`, {
          method: "POST",
          body: JSON.stringify({
            username: values.username,
            password: values.password,
          }),
        })
          .then((res) => {
            if (res.ok) {
              return res.text();
            }
            throw new Error(res.statusText);
          })
          .then((data) => {
            message.success("Registration suceeded!");
          })
          .catch((err) => {
            message.error("Registration failed");
          });
      }
    });
  };

  // validate password entered in "confirm password" matches "password"
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Passwords don't match");
    } else {
      callback();
    }
  };

  // validate "password" matches "confirm password" (if entered)
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }

    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div>
        <Form
          {...formItemLayout}
          onSubmit={this.handleSubmit}
          className="register"
        >
          <Form.Item label="Username">
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "Username is required",
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password",
                },
                {
                  validator: this.validateToNextPassword,
                }
              ]
            })(<Input.Password />)}
          </Form.Item>

          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password",
                },
                {
                  validator: this.compareToFirstPassword,
                }
              ]
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

// higher order component
const RegistrationForm = Form.create({ name: "register" })(Register);
export default RegistrationForm;
