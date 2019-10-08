import { all } from 'redux-saga/effects';
import { exampleSaga } from './exampleSaga';
import { productSaga } from './productSaga';
import { categorySaga } from './categorySaga';

export default function* sagas() {
  yield all([...exampleSaga, ...productSaga, ...categorySaga]);
}
