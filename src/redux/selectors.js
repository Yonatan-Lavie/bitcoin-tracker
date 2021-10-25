// import { createSelector } from 'reselect';

let options = {
  hour12: false,
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

export const getLastPrice = (state) => state.bitcoin.data.last;
export const getDataHistory = (state) => state.bitcoin.history;
export const getLastUpdate = (state) =>
  new Date(state.bitcoin.data.lastUpdate).toLocaleString('en-US', options) +
  ' UTC';
