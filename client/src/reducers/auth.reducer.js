import { REGISTER } from "../constants";

// state user
let initState = {
  isAuthentication: false,
  user: {}
};

// xac thuc viec dang nhap
function auth(state = initState, actions) {
  switch (actions.type) {
    case REGISTER.SUCCESS:
      return {
        ...initState,
        isAuthentication: true,
        user: {
          ...initState.user,
          ...actions.payload.data
        }
      };
    case REGISTER.FAIL:
      return {
        ...initState,
        user: {
          ...initState.user,
          ...actions.payload
        }
      };
    default:
      return state;
  }
}

export default auth;
