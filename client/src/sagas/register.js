import { takeLatest, call, put } from "redux-saga/effects";
import { REGISTER } from "../constants";
import { registerApi } from "../apis/authorization.api";
import { errRegister } from "../actions";

export function* handleRegister({ newUser, history }) {
  try {
    let info = yield call(registerApi, newUser);
    let dataUser = info.data;
    if (dataUser) {
      history.push("/login");
    }
  } catch (err) {
    let errRes = err.response.data;
    yield put(errRegister(errRes));
  }
}

export function* register() {
  yield takeLatest(REGISTER.START, handleRegister);
}
