import {all} from 'redux-saga/effects';

import LoginSagas from './authReducer/sagas';
import ArquivosSagas from './arquivosreducer/sagas';
import EmpresaSaga from './empresareducer/sagas';

export default function* rootSaga(){
    return yield all([LoginSagas, ArquivosSagas, EmpresaSaga]);
}
