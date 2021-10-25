export const UPDATE_DATA = 'UPDATE_DATA';
export const updateData = (data) => ({
  type: UPDATE_DATA,
  payload: { data },
});
export const UPDATE_DATA_HISTORY = 'UPDATE_DATA_HISTORY';
export const updateDataHistory = (data) => ({
  type: UPDATE_DATA_HISTORY,
  payload: { data },
});
