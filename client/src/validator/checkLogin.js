import setAutherToken from "../apis/setHeader.api";
import { successAuth } from "../actions";
import jwt_decode from "jwt-decode";

export default function checkLogin(store) {
  // check jwt-token in localStorange
  if (localStorage.jwtToken) {
    // set token in each request axios
    setAutherToken(localStorage.jwtToken);
    // decode
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(successAuth(decoded));
    // check thoi gian
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(successAuth({}));
      // TODO: Clear current Profile

      // Redirect to login
      window.location.href = "/login";
    }
  }
}
