import { all, call } from "typed-redux-saga/macro";

import { categoriesSaga } from "./categories/category.saga";
import { userSagas } from "./user/user.saga"; //For the connection

//Because of the * it's a generator function
export function* rootSaga() {
  yield* all([call(categoriesSaga), call(userSagas)]);
}