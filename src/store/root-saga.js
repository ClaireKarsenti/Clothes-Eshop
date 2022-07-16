import { all, call } from "redux-saga/effects";

import { categoriesSaga } from "./categories/category.saga";

//Because of the * it's a generator function
export function* rootSaga() {
  yield all([call(categoriesSaga)]);
}
