import axios from 'axios';
import { updateDataHistory } from './actions';

const params = {
  aggregate: 1,
  e: 'CCCAGG',
  fsym: 'BTC',
  tsym: 'usd',
  limit: 60,
};

const getHistory = axios.create({
  baseURL: 'https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles',
});

const getHistoryData = async (params, route) => {
  try {
    const res = await getHistory(route, {
      params,
    });
    // console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const loadDataHistory =
  (periodTime = '1-minute') =>
  async (dispatch) => {
    try {
      let data;
      switch (periodTime) {
        case '1-minute': {
          params.aggregate = 1;
          params.limit = 60;
          data = await getHistoryData(params, '/histominute');
          break;
        }

        case '5-minutes': {
          params.aggregate = 5;
          params.limit = 36;
          data = await getHistoryData(params, '/histominute');
          break;
        }
        case '1-hour': {
          params.aggregate = 1;
          params.limit = 48;
          data = await getHistoryData(params, '/histohour');
          break;
        }
        case '1-week': {
          params.aggregate = 7;
          params.limit = 52;
          data = await getHistoryData(params, '/histoday');
          break;
        }
        default:
          break;
      }

      dispatch(updateDataHistory(data));
    } catch (err) {
      console.log(err);
    }
  };

// export const addTodoRequest = text => async dispatch => {
//     try {
//         const body = JSON.stringify({ text });
//         const response = await fetch('http://localhost:8080/todos', {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             method: 'post',
//             body,
//         });
//         const todo = await response.json();
//         dispatch(createTodo(todo));
//     } catch (e) {
//         dispatch(displayAlert(e));
//     }
// }

// export const removeTodoRequest = id => async dispatch => {
//     try {
//         const response = await fetch(`http://localhost:8080/todos/${id}`, {
//             method: 'delete'
//         });
//         const removedTodo = await response.json();
//         dispatch(removeTodo(removedTodo));
//     } catch (e) {
//         dispatch(displayAlert(e));
//     }
// }

// export const markTodoAsCompletedRequest = id => async dispatch => {
//     try {
//         const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
//             method: 'post'
//         });
//         const updatedTodo = await response.json();
//         dispatch(markTodoAsCompleted(updatedTodo));
//     } catch (e) {
//         dispatch(displayAlert(e));
//     }
// }

// export const displayAlert = text => () => {
//     alert(text);
// };
