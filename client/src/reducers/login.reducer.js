import { LOGIN } from "../constants";

const userState = {
  isAuth: false,
  user: {}
};

let loginReducer = (state = userState, action) => {
  switch (action.type) {
    case LOGIN.SUCCESS:
      return {
        isAuth: true,
        user: action.user
      };
    default:
      return state;
  }
};

export { loginReducer };
