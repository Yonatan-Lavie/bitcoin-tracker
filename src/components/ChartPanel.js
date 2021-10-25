import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
} from 'recharts';

const ChartPanel = ({ data }) => {
  const parseData = (data) => {
    const dateFormat = (date, options) =>
      new Date(date).toLocaleString('default', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
      });
    return data.map((item) => {
      const parsedItem = {
        date: dateFormat(item.Date),
        value: Number(item.Close),
      };
      return parsedItem;
    });
  };

  const parsedData = parseData(data);
  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={parsedData}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.5} />
              <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />
          <XAxis dataKey="date" />
          <YAxis
            dataKey="value"
            tickLine={false}
            tickCount={8}
            orientation={'right'}
            type="number"
            domain={['dataMin - 500', 'dataMax + 500']}
          />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default ChartPanel;
