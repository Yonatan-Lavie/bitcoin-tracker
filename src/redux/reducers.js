import { UPDATE_DATA, UPDATE_DATA_HISTORY } from './actions';

const initialState = { isLoading: false, data: {}, history: [] };

export const bitcoin = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_DATA: {
      const { data } = payload;
      return {
        ...state,
        data: data,
      };
    }
    case UPDATE_DATA_HISTORY: {
      const { data } = payload;
      return {
        ...state,
        history: data,
      };
    }

    default:
      return state;
  }
};
