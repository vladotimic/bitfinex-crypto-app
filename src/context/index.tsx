import { useContext } from 'react';
import { AppContext } from './provider';

function useAppContext() {
  return useContext(AppContext);
}

export default useAppContext;
