import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabPanel } from './TabPanel';
import ChartPanel from './ChartPanel';

import { loadDataHistory } from '../redux/thunks';
import { getDataHistory } from '../redux/selectors';
import TablePanel from './TablePanel';

const SECOND_IN_TICKS = 1000;
const MINUTE_IN_TICKS = 60000;
const HOUER_IN_TICKS = 60000 * 60;
const DAY_IN_TICKS = 60000 * 60 * 24;

const configObjects = (date) => {
  const days = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return [
    {
      periodTime: '1-minute',
      refreshTicks: MINUTE_IN_TICKS,
      diff: seconds * SECOND_IN_TICKS,
    },
    {
      periodTime: '5-minutes',
      refreshTicks: 5 * MINUTE_IN_TICKS,
      diff: (5 - (minutes % 5)) * MINUTE_IN_TICKS + seconds * SECOND_IN_TICKS,
    },
    {
      periodTime: '1-hour',
      refreshTicks: HOUER_IN_TICKS,
      diff: minutes * MINUTE_IN_TICKS + seconds * SECOND_IN_TICKS,
    },
    {
      periodTime: '1-week',
      refreshTicks: DAY_IN_TICKS * 7,
      diff:
        (7 - days) * DAY_IN_TICKS +
        hours * HOUER_IN_TICKS +
        minutes * MINUTE_IN_TICKS +
        seconds * SECOND_IN_TICKS,
    },
  ];
};

let interval;

export const BasicTabs = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [time, setTime] = useState(0);
  const data = useSelector(getDataHistory);

  const startIntervalHistoryLoading = (
    periodTime,
    refreshTicks = 10000,
    diff
  ) => {
    dispatch(loadDataHistory(periodTime));

    setTimeout(() => {
      interval = setInterval(() => {
        dispatch(loadDataHistory(periodTime));
      }, refreshTicks);
    }, refreshTicks - diff);
  };

  useEffect(() => {
    clearInterval(interval);
    startIntervalHistoryLoading(configObjects[time]);
    return () => {};
  }, []);

  const valueChange = (event, newValue) => {
    setValue(newValue);
  };
  const timeChange = (event, newValue) => {
    const { periodTime, refreshTicks, diff } = configObjects(new Date())[
      newValue
    ];
    setTime(newValue);
    clearInterval(interval);
    startIntervalHistoryLoading(periodTime, refreshTicks, diff);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={valueChange}>
          <Tab label="Overview" />
          <Tab label="History" />
        </Tabs>
        <Tabs value={time} onChange={timeChange}>
          <Tab label="1 Minute" />
          <Tab label="5 Minutes" />
          <Tab label="1 Hour" />
          <Tab label="1 Week" />
        </Tabs>
        <TabPanel value={value} index={0}>
          {value === 0 ? (
            <ChartPanel data={data} />
          ) : (
            <TablePanel data={data} />
          )}
        </TabPanel>
      </Box>
    </Box>
  );
};
