import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/stack-sans-text/400.css';
import '@fontsource/stack-sans-text/500.css';
import '@fontsource/stack-sans-text/600.css';
import '@fontsource-variable/bricolage-grotesque';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/mona-sans';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);