import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { getInitialContext } from '@ionic/portals';

const context = getInitialContext<{ initialNumber: number }>()?.value ?? { initialNumber: 0 };

  ReactDOM.render(
    <React.StrictMode>
      <App initialNumber={context.initialNumber} />
    </React.StrictMode>,
    document.getElementById('root')
  );

// Service worker registration
serviceWorkerRegistration.unregister();
reportWebVitals();
