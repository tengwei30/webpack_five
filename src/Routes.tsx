/**
 * 根路由配置，非根路由请移步到想对应的组件创建
 * https://reactrouter.com/web/guides/quick-start
 * */
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './views/home/';


const Routes = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" component={Home} exact />
            </Switch>
        </HashRouter>
    );
};

export default Routes;
