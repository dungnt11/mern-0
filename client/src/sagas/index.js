import { login } from "./login.saga";

export default function* rootSaga() {
  yield login();
}
