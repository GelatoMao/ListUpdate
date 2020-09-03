import React from "react";
import { Form, Input, Button } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// form表单提交组件
export default class FormList extends React.Component {
  //表单校验成功
  onFinish = (values) => {
    console.log("success", values);
  };

  //表单校验失败
  onFinishFailed = (errorInfo) => {
    console.log("failed", errorInfo);
  };

  render() {
    return (
      <div className="formlist-wrapper">
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <p className="formlist-title">平台信息</p>
          <Form.Item
            label="领域"
            name="formlist-field"
            rules={[
              {
                required: true,
                message: "请输入领域",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="名称"
            name="formlist-name"
            rules={[
              {
                required: true,
                message: "请输名称",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="签名"
            name="formlist-sign"
            rules={[
              {
                required: true,
                message: "请输签名",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <p className="formlist-title">运营者信息</p>
          <Form.Item
            label="姓名"
            name="formlist-name1"
            rules={[
              {
                required: true,
                message: "请输姓名",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="身份证"
            name="formlist-idcard"
            rules={[
              {
                required: true,
                message: "请输身份证",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="formlist-email"
            rules={[
              {
                required: true,
                message: "请输邮箱",
              },
              {
                type: "email",
                message: "邮箱格式不正确",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="所属公司"
            name="formlist-company"
            rules={[
              {
                required: true,
                message: "请输所属公司",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="职务"
            name="formlist-job"
            rules={[
              {
                required: true,
                message: "请输职务",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              不通过
            </Button>
            <Button type="primary" htmlType="submit">
              通过
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
