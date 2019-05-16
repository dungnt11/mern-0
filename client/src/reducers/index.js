import { combineReducers } from "redux";

import { loginReducer } from "./login.reducer";

let rootReducer = combineReducers({
  loginReducer
});

export default rootReducer;
