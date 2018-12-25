import React, {Component} from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import Index from '../container/Index'
import Guide from '../container/Guide'
import MyScore from "../container/MyScore";
import Detail from '../container/Detail'
import OrganizationScore from "../container/OrganizationScore";
import Error from '../container/404'
import Reload from '../container/Reload'

export default class RouteConfig extends Component {

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Index}/>
          <Route path="/guide" exact component={Guide}/>
          <Route path="/myscore" exact component={MyScore}/>
          <Route path="/detail" exact component={Detail}/>
          <Route path="/organizationScore" exact component={OrganizationScore}/>
          <Route path="/error" exact component={Error}/>
          <Route path="/reload" exact component={Reload}/>
          <Redirect to="/"/>
        </Switch>
      </HashRouter>
    )
  }
}