import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './Components/App';
import './i18n';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let module: any;

ReactDOM.render(
  <App framework="React" compiler="typescript" bundler="webpack" />,
  document.getElementById('root'),
);
if (module.hot) {
  module.hot.accept();
}
