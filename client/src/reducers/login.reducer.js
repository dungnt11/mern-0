import { AUTH } from "../constants";

const userState = {
  isAuth: false,
  user: {}
};

let loginReducer = (state = userState, action) => {
  switch (action.type) {
    case AUTH.SUCCESS:
      return {
        isAuth: true,
        user: action.user
      };
    default:
      return state;
  }
};

export { loginReducer };
