import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Store } from "./actions/store"
import { provider, Provider } from "react-redux"

function App() {
  return (
    <Provider store={store}>
      <dnotes/>
    </Provider>
  );
}

export default App;
