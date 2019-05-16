import { AUTH } from "../constants";

export const startAuth = user => ({
  type: AUTH.START,
  newUser: user
});

export const errAuth = err => ({
  type: AUTH.FAIL,
  err
});

export const successAuth = user => ({
  type: AUTH.SUCCESS,
  user
});
