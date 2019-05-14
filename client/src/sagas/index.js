import { register } from './saga.register';
import { fork } from 'redux-saga/effects'
// MAIN CHÍNH 
export default function* rootSaga() {
  yield fork(register)
}
