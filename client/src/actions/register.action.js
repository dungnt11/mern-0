import { REGISTER } from "../constants";

export const startRegister = user => ({
  type: REGISTER.START,
  newUser: user
});

export const errRegister = err => ({
  type: REGISTER.FAIL,
  err
});

export const successRegister = user => ({
  type: REGISTER.SUCCESS,
  user
});
