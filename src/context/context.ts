import { createContext } from 'react';
import { ICurrency } from '../types';

export interface InitialState {
  user: boolean;
  isLoading: boolean;
  error: string;
  currencies: ICurrency[];
  favorites: string[];
  tickers: string[];
  channels: {
    [key: number]: string;
  };
  addToFavorite: (id: string) => void;
  removeFromFavorite: (id: string) => void;
  login: () => void;
}

const getSession = (name: string, fallback: boolean | [] | object) => {
  const session = sessionStorage.getItem(name);
  if (session) {
    return JSON.parse(session);
  }
  return fallback;
};

export const initialState: InitialState = {
  user: getSession('user', false),
  isLoading: false,
  error: '',
  currencies: [],
  favorites: getSession('favorites', []),
  tickers: getSession('tickers', []),
  channels: {},
  addToFavorite: () => {},
  removeFromFavorite: () => {},
  login: () => {},
};

export const AppContext = createContext<InitialState>(initialState);
