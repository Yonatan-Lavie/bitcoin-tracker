import React from 'react';
import { BitcoinWebSocket } from './BitcoinWebSocket';

import Header from './components/Header';
import { BasicTabs } from './components/BasicTabs';

const App = () => {
  BitcoinWebSocket();

  return (
    <div className="App" style={{ padding: '60px' }}>
      <Header />
      <BasicTabs />
    </div>
  );
};

export default App;
