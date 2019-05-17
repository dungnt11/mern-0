import setAutherToken from "../apis/setHeader.api";

import { AUTH } from "../constants";
import isEmpty from "../validator";

const userState = {
  isAuth: false,
  user: {}
};

let loginReducer = (state = userState, action) => {
  switch (action.type) {
    case AUTH.SUCCESS:
      // xu ly hanh dong logout
      if (isEmpty(action.user)) {
        localStorage.removeItem("jwtToken");
        // xoa token
        setAutherToken(false);
      }
      return {
        isAuth: !isEmpty(action.user),
        user: action.user
      };
    default:
      return state;
  }
};

export { loginReducer };
