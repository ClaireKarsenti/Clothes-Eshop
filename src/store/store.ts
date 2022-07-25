import { compose, createStore, applyMiddleware, Middleware } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger"; /*Logger allows me to see in the console what the state looks like before an action is dispatch, 
what the action is and then how the state intern look after the action*/

import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

//I want to keep the item in the cart when I refresh. For that I need to use redux-persist.
const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], //I want to persist the cart
};

const sagaMiddleWare = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* middleWares is kind of a library helpers that run before an action hit the reducer. 
I want to run this logger from middleWares only when I am in development and not when I am in production. 
For that I need to leverage the process.env.NODE_ENV that tell me wether not I am in development or in prodcution
based on the string 'development' or 'production' */
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleWare,
].filter((middleware): middleware is Middleware => Boolean(middleware));

//I use Redux DevTools
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

//I generate the store :
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);
/* I need a persistedReducer in order to generate the store.
The second argument is a default state (optionnal).
The thirs argument is the middleWares */

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
