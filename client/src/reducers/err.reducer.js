import { AUTH, REGISTER } from '../constants'

export const errAuth = (state = {}, actions) => {
  switch (actions.type) {
    case AUTH.FAIL:
      return actions.err
    case REGISTER.FAIL:
      return actions.err
    default:
      return state
  }
}