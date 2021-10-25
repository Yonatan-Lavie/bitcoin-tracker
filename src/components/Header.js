import React from 'react';
import { useSelector } from 'react-redux';
import { getLastPrice, getLastUpdate } from '../redux/selectors';
import Card from '@mui/material/Card';
const Header = () => {
  const lastPrice = useSelector(getLastPrice);
  const lastUpdate = useSelector(getLastUpdate);
  return (
    <Card style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <img src={'btc.png'} />
            <h1>Bitcoin</h1>
          </div>
          <div>{lastUpdate}</div>
        </div>
        <h1>$ {lastPrice}</h1>
      </div>
    </Card>
  );
};

export default Header;
