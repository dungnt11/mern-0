import { take, call, put } from "redux-saga/effects";

import { postRegister } from "../apis/api.user";
import { REGISTER } from "../constants";
import { registerFail, registerSuccess } from "../actions/index";

// xu ly viec dang ki
export function* register() {
  try {
    let { payload } = yield take(REGISTER.START);
    let result = yield call(postRegister, JSON.stringify(payload));
    yield put(registerSuccess(result));
  } catch (err) {
    yield put(registerFail(err.response.data));
  }
}
