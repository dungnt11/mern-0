import { combineReducers } from "redux";

import { loginReducer } from "./login.reducer";
import { errAuth } from "./err.reducer";

let rootReducer = combineReducers({
  loginReducer,
  errAuth
});

export default rootReducer;
