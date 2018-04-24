import React from "react";
import { Provider } from "mobx-react";
import { Route, BrowserRouter, HashRouter, Switch, Link } from "react-router-dom";
import stores from "./stores";

import Loadable from "react-loadable";

const Loading = () => "Loading...";
const User = Loadable({ loader: () => import("./user"), loading: Loading, delay: 150 });

import Home from "./home";

class Component extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <HashRouter>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/user" component={User} />
                        </Switch>
                        <Link to="/">首页········</Link>
                        <Link to="/user">-------用户</Link>
                    </div>
                </HashRouter>
            </Provider>
        );
    }
}

export default Component;
