import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import App from './App';

const rootElement = document.getElementById('root'); // Get the root element
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Create a root
  root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}