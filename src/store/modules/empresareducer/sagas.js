import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';

function* Empresa({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers.Authorization = `Bearer ` + token;
        const response = yield call(axios.post, `/empresa/`, payload);
        yield put(actions.EMPRESASUCCESS({...response.data}));
        if(token){
            yield put(actions.EMPRESA_BUSCARREQUEST());
        }
    }catch(error){
        console.log(error)
        yield put(actions.EMPRESAFALURE({erro: error}));
    }
}

function* CriarEmpresaComFoto({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type' :'multipart/form-data',
            'Authorization': `Bearer ${token}`
        };
        // arquivo
        const formData = new FormData();
        formData.append('originalname', payload.photo.originalname);
        formData.append('filename', payload.photo.filename);
        formData.append('id_dono', payload.photo.id_dono);
        formData.append('id_empresa_dona', payload.photo.id_empresa_dona);
        formData.append('mime_type', payload.photo.mime_type);
        formData.append('file', payload.photo.file);
        const responseFile = yield call(axios.post, "/arquivo/", formData);
        payload.id_foto = responseFile.data.id;

        axios.defaults.headers = {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`
        };

        const response = yield call(axios.post, `/empresa/`, payload);
        yield put(actions.EMPRESASUCCESS({...response.data}));
        yield put(actions.EMPRESA_BUSCARREQUEST());
    }catch(error){
        console.log(error)
        yield put(actions.EMPRESAFALURE({erro: error}));
    }
}

function* EditarEmpresaComFoto({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type' :'multipart/form-data',
            'Authorization': `Bearer ${token}`
        };
        // arquivo
        const formData = new FormData();
        formData.append('originalname', payload.photo.originalname);
        formData.append('filename', payload.photo.filename);
        formData.append('id_dono', payload.photo.id_dono);
        formData.append('id_empresa_dona', payload.photo.id_empresa_dona);
        formData.append('mime_type', payload.photo.mime_type);
        formData.append('file', payload.photo.file);
        const responseFile = yield call(axios.post, "/arquivo/", formData);
        payload.id_foto = responseFile.data.id;

        axios.defaults.headers = {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`
        };

        const response = yield call(axios.put, `/empresa/${payload.id}`, payload);
        yield put(actions.EMPRESA_EDITARSUCCESS({...response.data}));
        yield put(actions.EMPRESA_BUSCARREQUEST());
    }catch(error){
        console.log(error)
        yield put(actions.EMPRESA_EDITARFALURE({erro: error}));
    }
}

function* EditarEmpresa({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers.Authorization = `Bearer ` + token;
        const response = yield call(axios.put, `/empresa/${payload.id}`, payload);
        yield put(actions.EMPRESA_EDITARSUCCESS({...response.data}));
        yield put(actions.EMPRESA_BUSCARREQUEST());
    }catch(error){
        yield put(actions.EMPRESA_EDITARFALURE({erro: error}));
    };
};

function* BuscarEmpresa({payload = {}}){
    try{
        if(!payload.filter){
            payload.filter = ""
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers.Authorization = `Bearer ` + token;
        const response = yield call(axios.get, `/empresas/?filter=${encodeURIComponent(payload.filter)}`, payload);
        yield put(actions.EMPRESA_BUSCARSUCCESS({...response.data}));
    }catch(error){
        yield put(actions.EMPRESA_BUSCARFALURE({erro: error}));
    }
}

function* DeletarEmpresa({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        const response = yield call(axios.delete, `/empresa/${payload.id}`, payload);
        yield put(actions.EMPRESA_DELETAR_SUCCESS({...response.data}));
        yield put(actions.EMPRESA_BUSCARREQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.EMPRESA_DELETAR_FALURE({error}));
    }
}



export default all([
    takeLatest(types.EMPRESA_REQUEST, Empresa),
    takeLatest(types.EMPRESA_EDITAR_REQUEST, EditarEmpresa),
    takeLatest(types.EMPRESA_BUSCAR_REQUEST, BuscarEmpresa),
    takeLatest(types.EMPRESA_DELETAR_REQUEST, DeletarEmpresa),
    takeLatest(types.EMPRESA_CRIAR_COM_FOTO, CriarEmpresaComFoto),
    takeLatest(types.EMPRESA_EDITAR_COM_FOTO, EditarEmpresaComFoto),
]);
