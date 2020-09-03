import React from "react";
import { List, PageHeader } from "antd";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

export default class ScriptPub extends React.Component {
  render() {
    return (
      <div className="list2-wrapper list-wrapper">
        <PageHeader className="site-page-header" title="稿件 / 已发布" />
        <List
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
    );
  }
}
