import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import './utils/rem'
import './index.css';
import App from './App';
import 'antd-mobile/lib/date-picker/style/css';        // 加载 CSS
// import registerServiceWorker from './registerServiceWorker';
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));
// registerServiceWorker();
