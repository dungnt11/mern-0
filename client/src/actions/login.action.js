import { LOGIN } from "../constants";

export const startLogin = user => ({
  type: LOGIN.START,
  newUser: user
});

export const errLogin = err => ({
  type: LOGIN.FAIL,
  err
});

export const successLogin = user => ({
  type: LOGIN.SUCCESS,
  user
});