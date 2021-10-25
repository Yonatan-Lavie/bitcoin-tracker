import React from 'react';
import { BitcoinWebSocket } from './BitcoinWebSocket';
import ChartPanel from './components/ChartPanel';
import Header from './components/Header';

// Material UI Tabs
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
