import React, {Component} from 'react';
import './App.css';
import Route from './router/router'
//document.cookie +=  ";userId=danche";

function setCookie(name,value)
{
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
setCookie('userId', 'danche');

class App extends Component {
  render() {
    return (
      <Route>

      </Route>
    );
  }
}

export default App;
