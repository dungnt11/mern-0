import { LOGIN } from '../constants'

export const errAuth = (state = {}, actions) => {
  switch (actions.type) {
    case LOGIN.FAIL:
      return actions.err
    default:
      return state
  }
}