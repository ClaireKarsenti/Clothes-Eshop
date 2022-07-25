import { Middleware } from "redux";

import { RootState } from "../store";

//If I don't use logger from redux-logger, I can use loggerMiddleware (and vice- versa) :
export const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (!action.type) {
      return next(action);
    }

    console.log("type: ", action.type);
    console.log("payload: ", action.payload);
    console.log("currentState: ", store.getState());

    next(action);

    console.log("next state: ", store.getState());
  };

/* ! Don't forget to import this file to store.js if I want to use it instead of logger.
 Think to pass loggerMiddleware to middleWares */
