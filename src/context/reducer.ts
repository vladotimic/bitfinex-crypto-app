import { InitialState } from './provider';
import { ICurrency, ACTION_TYPE } from '../types';

type Actions =
  | { type: ACTION_TYPE.GET_TICKERS_BEGIN }
  | { type: ACTION_TYPE.GET_TICKERS_SUCCESS; payload: string[] }
  | { type: ACTION_TYPE.GET_TICKERS_ERROR; payload: string }
  | { type: ACTION_TYPE.LOGIN }
  | { type: ACTION_TYPE.ADD_CHANNEL; payload: { [key: number]: string } }
  | { type: ACTION_TYPE.ADD_TO_FAVORITE; payload: string }
  | { type: ACTION_TYPE.REMOVE_FROM_FAVORITE; payload: string }
  | { type: ACTION_TYPE.CURRENCIES_UPDATE; payload: ICurrency };

function reducer(state: InitialState, action: Actions) {
  switch (action.type) {
    case ACTION_TYPE.LOGIN: {
      sessionStorage.setItem('user', 'true');
      return {
        ...state,
        user: true,
      };
    }
    case ACTION_TYPE.GET_TICKERS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case ACTION_TYPE.GET_TICKERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ACTION_TYPE.GET_TICKERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tickers: action.payload,
      };

    case ACTION_TYPE.ADD_TO_FAVORITE: {
      const favorites = [...state.favorites, action.payload];
      sessionStorage.setItem('favorites', JSON.stringify(favorites));
      return {
        ...state,
        favorites,
      };
    }
    case ACTION_TYPE.REMOVE_FROM_FAVORITE: {
      const copy = [...state.favorites];
      const filtered = copy.filter((item) => item !== action.payload);
      sessionStorage.setItem('favorites', JSON.stringify(filtered));
      return {
        ...state,
        favorites: filtered,
      };
    }
    case ACTION_TYPE.ADD_CHANNEL: {
      const channel = action.payload;
      const channels = { ...state.channels, ...channel };
      return {
        ...state,
        channels,
      };
    }
    case ACTION_TYPE.CURRENCIES_UPDATE: {
      const currentCurrency = action.payload;
      const doesExists = state.currencies.findIndex(
        (value) => value.id === currentCurrency.id
      );
      let currencies = [];
      if (doesExists !== -1) {
        const copy = [...state.currencies];
        copy[doesExists] = currentCurrency;
        currencies = copy;
      } else {
        currencies = [...state.currencies, currentCurrency];
      }
      return {
        ...state,
        currencies,
      };
    }
    default:
      throw new Error('Wrong action type!');
  }
}

export default reducer;
