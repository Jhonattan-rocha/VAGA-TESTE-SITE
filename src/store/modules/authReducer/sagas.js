import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';


function* Login({payload}) {
    try{
        const response = yield call(axios.post, "/token/", payload)
        const token = response.token
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        yield put(actions.LoginSuccess({ ...response.data }));
    }catch(err) {
        console.log(err)
        yield put(actions.LoginFalure());
    }
}

function* BuscarUsuario({payload = {}}){
    try{
        if(!payload.filter){
            payload.filter = ""
        }
        const token = yield select(state => state.authreducer.token);
        // axios.defaults.headers.Authorization = `Bearer ` + token;
        const response = yield call(axios.get, `/usuarios/?filter=${encodeURIComponent(payload.filter)}`, payload);
        yield put(actions.USUARIO_BUSCARSUCCESS({...response.data}));
    }catch(error){
        yield put(actions.USUARIO_BUSCARFALURE({erro: error}));
    }
}

export default all([
    takeLatest(types.LOGIN_REQUEST, Login),
    takeLatest(types.USUARIO_BUSCAR_REQUEST, BuscarUsuario),
]);
    