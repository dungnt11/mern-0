import { combineReducers } from "redux";

import auth from "./auth.reducer.js";
import loadingRegister from './loading'

export default combineReducers({
  auth,
  loadingRegister
});
