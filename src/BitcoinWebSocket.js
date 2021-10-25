import { useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useDispatch } from 'react-redux';
import { updateData } from './redux/actions';

export const BitcoinWebSocket = () => {
  const dispatch = useDispatch();

  const socketUrl = 'wss://wstest.fxempire.com?token=btctothemoon';
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data)['cc-btc-usd-cccagg'];
      dispatch(updateData(data));
    }
  }, [lastMessage]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendMessage(
        JSON.stringify({
          type: 'SUBSCRIBE',
          instruments: ['cc-btc-usd-cccagg'],
        })
      );
    }

    return () => {};
  }, [readyState]);
};
