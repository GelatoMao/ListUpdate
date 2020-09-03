import React from "react";
import FormList from "./FormList";
import { Steps, PageHeader } from "antd";

const { Step } = Steps;

// antd 步骤条组件
class Demo extends React.Component {
  state = {
    current: 0,
  };
  onChange = (current) => {
    // console.log("onChange:", current);
    this.setState({ current });
  };
  render() {
    const { current } = this.state;
    return (
      <Steps
        type="navigation"
        current={current}
        onChange={this.onChange}
        className="site-navigation-steps"
      >
        {/* status三种状态 finish process wait */}
        <Step status="process" title="填写信息" />
        <Step status="wait" title="等待审核" />
        <Step status="wait" title="认证通过" />
      </Steps>
    );
  }
}

export default class PersonalAuth extends React.Component {
  render() {
    return (
      <div className="list6-wrapper list-wrapper">
        <PageHeader className="site-page-header" title="权限认证/个人认证" />
        <Demo />
        <FormList />
      </div>
    );
  }
}
