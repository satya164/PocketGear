import { registerRootComponent } from 'expo';
import * as React from 'react';

import App from './App';

registerRootComponent(() => (
  <React.StrictMode>
    <App />
  </React.StrictMode>
));
