import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import SiderDemo from './components/App';
import './styles/style.css';
import './styles/FormList.css';
import './styles/HomePage.css';
import './styles/ScriptPub.css';
import './styles/UserGroup.css';
import './styles/PersonalAuth.css';
import './styles/Setting.css';
import './styles/PictureDisplay.css'

//新添加index.css 和 reset.css
import './styles/common/index.css'
import './styles/common/reset.css'


ReactDOM.render(
  <SiderDemo />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

