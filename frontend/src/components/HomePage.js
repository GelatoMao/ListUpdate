import React from "react";
import { List, Input, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
// import "./MyList1.css";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="#"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="#"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

// 格式化日期 将时间戳格式化成字符串
function formateDate(time) {
  if (!time) return ''
  let date = new Date(time)
  let curYear = date.getFullYear()
  let curMonth = date.getMonth() + 1
  let curDate = date.getDate()
  let curHour = date.getHours()
  let curMinute = date.getMinutes()
  let curSecond = date.getSeconds()
  curHour = curHour < 10 ? ("0" + curHour) : curHour
  curMinute = curMinute < 10 ? ("0" + curMinute) : curMinute
  curSecond = curSecond < 10 ? ("0" + curSecond) : curSecond
  return curYear + '-' + curMonth + '-' + curDate + ' ' + curHour + ':' + curMinute + ':' + curSecond

}

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 当前时间字符串形式
      currentTime: formateDate(Date.now()),
      weather: "晴"
    };
  }

  //更新当前时间
  getTime = () => {
    //每隔一秒获取当前时间，并更新状态数据currentTime
    setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState(() => ({
        currentTime,
      }));
    }, 1000);
  };

  componentDidMount() {
    this.getTime();
  }

  render() {
    const { currentTime, weather } = this.state;
    return (
      <div className="list1-wrapper list-wrapper clearfix">
        <div className="list1-label">
          <span>{currentTime}&nbsp;</span>
          <span>{weather}</span>
        </div>

        <div className="list1-article">
          <Input placeholder="最近编辑稿件" size="large" />
        </div>

        <div className="list1-history">
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              发布稿件历史记录
              <DownOutlined />
            </a>
          </Dropdown>
        </div>

        <List
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
    );
  }
}
