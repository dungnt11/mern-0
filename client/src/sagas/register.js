import { takeLatest, call } from "redux-saga/effects";

import { REGISTER } from "../constants";
import { registerApi } from "../apis/authorization.api";

export function* handleRegister({ newUser }) {
  try {
    let info = yield call(registerApi, newUser);
    let dataUser = info.data;
    if (dataUser) {
      console.log('thanh cong')
    }
  } catch (err) {
    let errRes = err.response.data;
    console.log(errRes);
  }
}

export function* register() {
  yield takeLatest(REGISTER.START, handleRegister);
}
