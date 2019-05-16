import { AUTH } from '../constants'

export const errAuth = (state = {}, actions) => {
  switch (actions.type) {
    case AUTH.FAIL:
      return actions.err
    default:
      return state
  }
}