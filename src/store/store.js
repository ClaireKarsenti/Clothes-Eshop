import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
/*Logger allows me to see in the console what the state looks like before an action is dispatch, 
what the action is and then how the state intern look after the action*/

import { rootReducer } from "./root-reducer";

const middleWares = [logger]; // middleWares is kind of a library helpers that run before an action hit the reducer

const composedEnhancers = compose(applyMiddleware(...middleWares));

//I generate the store :
export const store = createStore(rootReducer, undefined, composedEnhancers);
/* I need a rootReducer in order to generate the store.
The second argument is a default state (optionnal).
The thirs argument is the middleWares */
