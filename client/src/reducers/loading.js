import { REGISTER } from "../constants";

function loadingRegister(state = false, action) {
  switch (action.type) {
    case REGISTER.START:
      return true;
    case REGISTER.SUCCESS:
      return false;
    case REGISTER.FAIL:
      return false;
    default:
      return state;
  }
}

export default loadingRegister;
