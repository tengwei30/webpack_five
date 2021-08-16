// eslint-disable-next-line no-use-before-define
import * as React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';

interface iProps {
    children: string
}

const App = (props: iProps) => {
    return (
        <>
            <h1>{props.children}</h1>
            <DatePicker />
        </>
    );
};

render(<App>hello Webpack5 TypeScript!</App>, document.getElementById('root'));
