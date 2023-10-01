export interface ICurrency {
  id: string;
  symbol: string;
  lastPrice: number;
  dailyChange?: number;
  dailyChangePercentage?: number;
  dailyHigh: number;
  dailyLow: number;
}

export enum ACTION_TYPE {
  GET_TICKERS_BEGIN = 'GET_TICKERS_BEGIN',
  GET_TICKERS_ERROR = 'GET_TICKERS_ERROR',
  GET_TICKERS_SUCCESS = 'GET_TICKERS_SUCCESS',
  LOGIN = 'LOGIN',
  ADD_CHANNEL = 'ADD_CHANNEL',
  ADD_TO_FAVORITE = 'ADD_TO_FAVORITE',
  REMOVE_FROM_FAVORITE = 'REMOVE_FROM_FAVORITE',
  CURRENCIES_UPDATE = 'CURRENCIES_UPDATE',
}
