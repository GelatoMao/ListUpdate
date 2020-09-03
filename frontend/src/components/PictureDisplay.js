import React from "react";
import {
  Tag,
  Input,
  Tooltip,
  Upload,
  message,
  Button,
  Divider,
  Row,
  Col,
} from "antd";
import { PlusOutlined, UploadOutlined, CloseOutlined } from "@ant-design/icons";

// antd 标签组件
class EditableTagGroup extends React.Component {
  state = {
    tags: ["Unremovable", "Tag 2", "Tag 3"],
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

//上传图片组件
const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

//图片列表组件数据
const data = [
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
  {
    title: "Title 5",
  },
  {
    title: "Title 6",
  },
];

//引入多张图片
// const demoImg = ["1", "2", "3", "4", "5", "6", "7", "8"];
// const ticks = demoImg.map((item) => require("../../images/" + item + ".png"));

export default class PictureDisplay extends React.Component {
  state = {
    demoImg: [
      { imgSrc: "1", imgName: "1" },
      { imgSrc: "2", imgName: "2" },
      { imgSrc: "3", imgName: "3" },
      { imgSrc: "4", imgName: "4" },
      { imgSrc: "5", imgName: "5" },
      { imgSrc: "6", imgName: "6" },
      { imgSrc: "7", imgName: "7" },
      { imgSrc: "8", imgName: "8" },
    ],
    modifyName: "",
  };
  //展示预览图层
  handleShowImg = (index) => {
    this[`imgPopup${index}`].style.display = "block";
  };

  //点击关闭预览图层
  handleCloseImg = (index) => {
    this[`imgPopup${index}`].style.display = "none";
  };

  //显示加号
  handleShowPlus = (index) => {
    // console.log(this.plus)
    this[`plus${index}`].style.display = "block";
  };

  //关闭加号
  handleClosePlus = (index) => {
    this[`plus${index}`].style.display = "none";
  };

  //修改图片信息资料
  modifyImgInfo = (index) => {
    const imgModify = this[`imgModify${index}`];
    // 先清除input框中的选项
    this.setState(() => ({
      modifyName: "",
    }));
    imgModify.style.display = "block";
  };

  //修改图片名字
  handleModifyName = (e) => {
    const value = e.target.value;
    this.setState(() => ({
      modifyName: value,
    }));
  };

  //提交修改图片名字
  handleSubmit = (index) => {
    const modifyName = this.state.modifyName;
    const demoImg = this.state.demoImg;
    //必须要输入值才改变
    if (modifyName !== '') {
      demoImg[index].imgName = modifyName;
    }
    this.setState(() => ({
      demoImg,
    }));
    const imgModify = this[`imgModify${index}`];
    imgModify.style.display = "none";
  };

  //渲染demoImg
  shoeDemoImg = () => {
    const { demoImg, modifyName } = this.state;
    //ticks是一个图片路径数组
    const ticks = demoImg.map((item) =>
      require("../images/" + item.imgSrc + ".png")
    );
    return demoImg.map((item, index) => {
      return (
        <Col
          className="gutter-row"
          span={6}
          style={{ position: "relative" }}
          ref={(col) => (this.col = col)}
          onMouseOver={() => this.handleShowPlus(index)}
          onMouseOut={() => this.handleClosePlus(index)}
          key={index}
        >
          <div className="list7-picbox">
            <img
              src={ticks[index]}
              className="list7-picbox-img"
              onClick={() => this.handleShowImg(index)}
            />
            <span>{`${item.imgName}.png`}</span>
          </div>
          <PlusOutlined
            className="list7-plus"
            ref={(plus) => (this[`plus${index}`] = plus)}
            onClick={() => this.modifyImgInfo(index)}
          />

          {/* 修改图片基本信息 */}
          <div
            className="list7-modify"
            ref={(imgModify) => (this[`imgModify${index}`] = imgModify)}
          >
            <div className="list7-modifyImg">
              <Input
                placeholder="修改图片名称"
                value={modifyName}
                onChange={this.handleModifyName}
              />
              <Input placeholder="修改图片标签" />
              <Button type="primary" onClick={() => this.handleSubmit(index)}>
                提交
              </Button>
            </div>
          </div>

          {/* 图片预览，弹出层 */}
          <div
            className="list7-popup"
            ref={(imgPopup) => (this[`imgPopup${index}`] = imgPopup)}
          >
            <img src={ticks[index]} alt="" className="list7-popup-img" />
            <CloseOutlined
              className="list7-closeimg"
              onClick={() => this.handleCloseImg(index)}
            />
          </div>
        </Col>
      );
    });
  };

  render() {
    const { demoImg } = this.state;
    return (
      <div className="list7-wrapper list-wrapper">
        <div className="list7-info">
          <p className="list7-pic">图片(共{demoImg.length}张)</p>
          <Upload {...props}>
            <Button>
              <UploadOutlined /> 图片名 (上传)
            </Button>
          </Upload>
        </div>
        <div className="list7-tag">
          <EditableTagGroup />
        </div>
        <div className="list7-picList">
          <Divider orientation="left"></Divider>
          <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
            {this.shoeDemoImg()}
          </Row>
        </div>
      </div>
    );
  }
}
