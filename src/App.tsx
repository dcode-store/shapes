import React from 'react';
import {
  RouterProvider,
} from "react-router-dom";
import { router } from "./router"
import { SWRConfig } from 'swr';
import { localStorageProvider } from './helper/localStorageProvider';

import './App.css';

import { Cache } from 'swr';

function App() {
  return (
    <SWRConfig value={{ provider: localStorageProvider as (cache: Readonly<Cache<any>>) => Cache<any> }}>
      <RouterProvider router={router} />
    </SWRConfig>
  );
}

export default App;
