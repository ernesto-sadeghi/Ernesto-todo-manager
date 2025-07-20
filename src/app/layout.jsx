'use client';

import "./globals.css";

import { store } from '@/app/store';
import { Provider } from 'react-redux';
import Header from "./components/Header";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      
      <Provider store={store}>
    <Header></Header>
        {children}
        
      </Provider>
        <footer className="flex justify-center p-8">
         made by <a href="https://github.com/ernesto-sadeghi" className="text-accent px-2"> Ernesto</a>
        </footer>
      </body>
    </html>
  );
}
