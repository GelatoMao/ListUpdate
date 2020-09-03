import React from "react";
import { Tag, Input, Tooltip, Avatar, Card, PageHeader, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// const data1 = [
//   {
//     title: "用户名",
//   },
// ];

// antd 标签组件 看不懂！！！！
class EditableTagGroup extends React.Component {
  state = {
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
  };

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter((tag) => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: "",
    });
  };

  handleEditInputChange = (e) => {
    this.setState({ editInputValue: e.target.value });
  };

  handleEditInputConfirm = () => {
    this.setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;

      return {
        tags: newTags,
        editInputIndex: -1,
        editInputValue: "",
      };
    });
  };

  saveInputRef = (input) => {
    this.input = input;
  };

  saveEditInputRef = (input) => {
    this.editInput = input;
  };

  render() {
    const {
      tags,
      inputVisible,
      inputValue,
      editInputIndex,
      editInputValue,
    } = this.state;

    return (
      <>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={this.saveEditInputRef}
                key={tag}
                size="small"
                className="tag-input"
                value={editInputValue}
                onChange={this.handleEditInputChange}
                onBlur={this.handleEditInputConfirm}
                onPressEnter={this.handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.length > 20;

          const tagElem = (
            <Tag
              className="edit-tag"
              key={tag}
              closable={index !== 0}
              onClose={() => this.handleClose(tag)}
            >
              <span
                onDoubleClick={(e) => {
                  if (index !== 0) {
                    this.setState(
                      { editInputIndex: index, editInputValue: tag },
                      () => {
                        this.editInput.focus();
                      }
                    );
                    e.preventDefault();
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
              tagElem
            );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            className="tag-input"
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag className="site-tag-plus" onClick={this.showInput}>
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </>
    );
  }
}

export default class UserGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplay: false, //控制卡片是否展示
      cardIndex: "", //点击卡片时的索引
      inputValue: "",
      list: [
        {
          title: "Title 1",
        },
        {
          title: "Title 2",
        },
        {
          title: "Title 3",
        },
        {
          title: "Title 4",
        },
      ],
    };
  }

  //点击显示用户详情信息
  handleCardShow = (index) => {
    this.setState((prevState) => ({
      isDisplay: !prevState.isDisplay,
      cardIndex: index,
    }));
    // e.preventDefault();
  };

  //处理用户输入事件
  handleInputValue = (e) => {
    const inputValue = e.target.value;
    this.setState(() => ({
      inputValue,
    }));
  };

  //处理点击添加按钮事件
  handleClick = () => {
    const { inputValue, list } = this.state;
    const clist = list;
    clist.push({ title: `${inputValue}` });
    this.setState(() => ({
      list: clist,
      inputValue: "",
    }));
  };

  //渲染list组件
  getLint3 = () => {
    const { list, isDisplay, cardIndex } = this.state;
    return list.map((item, index) => {
      return (
        <li key={index} className="li-pic">
          <a onClick={() => this.handleCardShow(index)}>
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </a>
          <span>{item.title}</span>
          <CardList
            cIndex={index}
            isDisplay={isDisplay}
            cardIndex={cardIndex}
            userName={item.title}
          />
        </li>
      );
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div className="list3-wrapper list-wrapper">
        <PageHeader className="site-page-header" title="人员" />
        <Input
          className="list3-input"
          placeholder="用户名"
          value={inputValue}
          onChange={this.handleInputValue}
          style={{ width: "200px", margin: "20px 0 20px 20px" }}
        />
        <Button type="primary" onClick={this.handleClick}>
          添加
        </Button>
        {/* 标签 */}
        <div className="list3-label">
          <EditableTagGroup />
        </div>

        {/* 没有用antd 里的List组件，用组件有个功能不知道怎么实现 */}
        <ul className="myUl">{this.getLint3()}</ul>
      </div>
    );
  }
}

// antd card组件
const { Meta } = Card;

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // cIndex是循环遍历时传过来的每个下标，cardIndex是点击时产生的下标
    const { isDisplay, cIndex, cardIndex, userName } = this.props;
    let strClass = isDisplay ? " active" : "";
    //相等时才将cardlist显示，否则隐藏
    if (cIndex === cardIndex) {
      return (
        <div className={"cardlist-wrapper " + strClass}>
          <Card style={{ width: 220 }}>
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={userName}
            />
            <Tag>Tag 1</Tag>
            <div className="cardBasicInfo">基本信息</div>
          </Card>
        </div>
      );
    } else {
      // return <div className={"cardlist-wrapper "}></div>;
      return null;
    }
  }
}
