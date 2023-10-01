import { useReducer, useEffect } from 'react';
import { ACTION_TYPE } from '../types';
import reducer from './reducer';
import { initialState, AppContext } from './context';
import useWebSocket, { ReadyState } from 'react-use-websocket';

type IMessage = {
  chanId: number;
  channel: string;
  event: string;
  pair: string;
  symbol: string;
};

type IResult = [number, number[]] & [number, string];

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tickers, channels } = state;

  const login = () => {
    dispatch({ type: ACTION_TYPE.LOGIN });
  };

  const getTickers = async () => {
    dispatch({ type: ACTION_TYPE.GET_TICKERS_BEGIN });
    try {
      const response = await fetch(`/api/symbols`);
      const result = await response.json();
      if (result) {
        const data = result.slice(0, 5);
        dispatch({ type: ACTION_TYPE.GET_TICKERS_SUCCESS, payload: data });
        sessionStorage.setItem('tickers', JSON.stringify(data));
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: ACTION_TYPE.GET_TICKERS_ERROR,
        payload: 'There was an error',
      });
    }
  };

  const addToFavorite = (id: string) => {
    dispatch({ type: ACTION_TYPE.ADD_TO_FAVORITE, payload: id });
  };

  const removeFromFavorite = (id: string) => {
    dispatch({ type: ACTION_TYPE.REMOVE_FROM_FAVORITE, payload: id });
  };

  useEffect(() => {
    if (tickers.length === 0) {
      getTickers();
    }
  }, [tickers]);

  const URL = import.meta.env.VITE_BITFINEX_WS;
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket<
    IMessage & IResult
  >(URL);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      tickers.map((ticker: string) => {
        sendJsonMessage({
          symbol: `t${ticker.toUpperCase()}`,
          event: 'subscribe',
          channel: 'ticker',
        });
      });
    }
  }, [readyState, tickers, sendJsonMessage]);

  useEffect(() => {
    if (lastJsonMessage) {
      const channelsArr = Object.values(channels);
      if (lastJsonMessage?.event === 'subscribed') {
        if (!channelsArr.includes(lastJsonMessage.pair.toLowerCase())) {
          const channel = {
            [lastJsonMessage.chanId]: lastJsonMessage.pair.toLowerCase(),
          };
          dispatch({ type: ACTION_TYPE.ADD_CHANNEL, payload: channel });
        }
      }
      if (lastJsonMessage[1] !== 'hb' && lastJsonMessage[0] in channels) {
        const currency = {
          id: channels[lastJsonMessage[0]],
          symbol: channels[lastJsonMessage[0]].toUpperCase(),
          lastPrice: lastJsonMessage[1][6],
          dailyChange: lastJsonMessage[1][4],
          dailyChangePercentage: lastJsonMessage[1][5],
          dailyHigh: lastJsonMessage[1][8],
          dailyLow: lastJsonMessage[1][9],
        };
        dispatch({ type: ACTION_TYPE.CURRENCIES_UPDATE, payload: currency });
      }
    }
  }, [lastJsonMessage, channels]);

  return (
    <AppContext.Provider
      value={{ ...state, login, addToFavorite, removeFromFavorite }}
    >
      {children}
    </AppContext.Provider>
  );
};
