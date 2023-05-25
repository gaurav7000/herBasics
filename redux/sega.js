import { call, put, takeEvery } from 'redux-saga/effects';
import { setNewArrivesData, setCategoriesData } from '../actions'; // Assuming you have defined these actions
function* fetchData() {
  try {
    const fetchedNewArrives = yield call(get, fetchedNewArrives);
    const fetchedCategories = yield call(get, fetchedCategories);

    yield put(setNewArrivesData(fetchedNewArrives.val()));
    yield put(setCategoriesData(fetchedCategories.val()));
  } catch (error) {
    console.error('Error retrieving data:', error);
    // Handle error, dispatch an action, or show an error message
  }
}
function* watchDataFetching() {
  yield takeEvery('FETCH_DATA', fetchData); // Replace 'FETCH_DATA' with the actual action type that triggers the data fetching
}
export default function* rootSaga() {
  yield all([
    // Other sagas...
    watchDataFetching(),
  ]);
}
