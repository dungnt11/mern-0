import { call, takeLatest, put } from "redux-saga/effects";
import { AUTH } from "../constants";
import { loginApi } from "../apis/authorization.api";
import { errAuth, successAuth } from "../actions";
import setAutherToken from "../apis/setHeader.api";
import jwtDecode from "jwt-decode";

export function* handleLogin({ newUser }) {
  try {
    // get token and status login is true
    let res = yield call(loginApi, newUser);
    let token = res.data.token;
    // save token and set header axios default
    localStorage.setItem("jwtToken", token);
    setAutherToken(token);
    // dispatch response data and decode after this
    yield put(successAuth(jwtDecode(token)));
  } catch (err) {
    // get err
    let resErr = err.response.data;
    yield put(errAuth(resErr));
  }
}

export function* login() {
  yield takeLatest(AUTH.START, handleLogin);
}
