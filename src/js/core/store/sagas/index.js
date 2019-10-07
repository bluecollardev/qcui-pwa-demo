import { all } from 'redux-saga/effects';
import { exampleSaga } from './exampleSaga';
import { productSaga } from './productSaga';

export default function* sagas() {
  yield all([...exampleSaga, ...productSaga]);
}
