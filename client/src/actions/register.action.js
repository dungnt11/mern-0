import { REGISTER } from "../constants";

export const startRegister = (user, history) => ({
  type: REGISTER.START,
  newUser: user,
  history
});

export const errRegister = err => ({
  type: REGISTER.FAIL,
  err
});

export const successRegister = user => ({
  type: REGISTER.SUCCESS,
  user
});
