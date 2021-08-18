import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './Routes';
import store, { history } from './store';
import 'antd/dist/antd.css';
import './styles/index.css';

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Routes />
            </ConnectedRouter>
        </Provider>
    </StrictMode>,
    document.getElementById('root')
);


