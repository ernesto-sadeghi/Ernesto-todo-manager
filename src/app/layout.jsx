'use client';

import "./globals.css";

import { store } from '@/app/store';
import { Provider } from 'react-redux';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          header
        </header>
      <Provider store={store}>

        {children}
        
      </Provider>
        <footer>
          footer
        </footer>
      </body>
    </html>
  );
}
