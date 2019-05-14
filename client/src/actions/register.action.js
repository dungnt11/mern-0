import { REGISTER } from "../constants";

let registerStart = newUser => ({
  type: REGISTER.START,
  payload: newUser
});

let registerSuccess = status => ({
  type: REGISTER.SUCCESS,
  payload: status
});

let registerFail = err => ({
  type: REGISTER.FAIL,
  payload: err
});

export { registerStart, registerSuccess, registerFail };
