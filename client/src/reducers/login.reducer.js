import { AUTH } from "../constants";
import isEmpty from "../validator";
const userState = {
  isAuth: false,
  user: {}
};

let loginReducer = (state = userState, action) => {
  switch (action.type) {
    case AUTH.SUCCESS:
      return {
        isAuth: !isEmpty(action.user),
        user: action.user
      };
    default:
      return state;
  }
};

export { loginReducer };
