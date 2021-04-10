import '../styles/globals.css';
import { AppProps } from 'next/app';
import { Provider as BumbagProvider, ToastManager } from 'bumbag';
import { createContext, useReducer } from 'react';
import { HttpRequestAction, httpRequestReducer, HttpRequestState, initialState } from '../store/http';

export const HttpRequestContext = createContext({} as {
  state: HttpRequestState
  dispatch: React.Dispatch<HttpRequestAction>;
});

function MyApp({ Component, pageProps }: AppProps) {
  const [ state, dispatch ] = useReducer(httpRequestReducer, initialState);
  return (
    <BumbagProvider isSSR>
      <HttpRequestContext.Provider value={{ state, dispatch }}>
        <Component {...pageProps} />
        <ToastManager />
      </HttpRequestContext.Provider>
    </BumbagProvider>
  )
}

export default MyApp
