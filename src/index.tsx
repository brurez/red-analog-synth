import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './ui/App';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
