import { useReducer, useEffect, useRef } from 'react';
import { ACTION_TYPE } from '../types';
import reducer from './reducer';
import { initialState, AppContext } from './context';

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

  const ws = useRef<WebSocket | null>(null);
  const URL = import.meta.env.VITE_BITFINEX_WS;

  useEffect(() => {
    if (!URL && !tickers) return;

    ws.current = new WebSocket(URL);

    ws.current.onopen = () => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        tickers.map((ticker: string) => {
          ws.current?.send(
            JSON.stringify({
              symbol: `t${ticker.toUpperCase()}`,
              event: 'subscribe',
              channel: 'ticker',
            })
          );
        });
      }
    };
  }, [URL, tickers, ws]);

  useEffect(() => {
    if (!ws.current) return;

    const channelsArr = Object.values(channels);

    ws.current.onmessage = (event) => {
      const result = JSON.parse(event.data);

      if (result?.event === 'subscribed') {
        if (!channelsArr.includes(result.pair.toLowerCase())) {
          const channel = {
            [result.chanId]: result.pair.toLowerCase(),
          };
          dispatch({ type: ACTION_TYPE.ADD_CHANNEL, payload: channel });
        }
      }
      if (result[1] !== 'hb' && result[0] in channels) {
        const currency = {
          id: channels[result[0]],
          symbol: channels[result[0]].toUpperCase(),
          lastPrice: result[1][6],
          dailyChange: result[1][4],
          dailyChangePercentage: result[1][5],
          dailyHigh: result[1][8],
          dailyLow: result[1][9],
        };
        dispatch({ type: ACTION_TYPE.CURRENCIES_UPDATE, payload: currency });
      }
    };
  }, [channels, ws]);

  return (
    <AppContext.Provider
      value={{ ...state, login, addToFavorite, removeFromFavorite }}
    >
      {children}
    </AppContext.Provider>
  );
};
