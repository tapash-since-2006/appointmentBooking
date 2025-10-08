import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './context/AppContext.jsx';
import App from './App.jsx';
import './index.css';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </AppContextProvider>
  </BrowserRouter>
);
