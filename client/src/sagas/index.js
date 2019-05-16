import { all } from "redux-saga/effects";

import { login } from "./login.saga";
import { register } from "./register";

export default function* rootSaga() {
  yield all([login(), register()]);
}
