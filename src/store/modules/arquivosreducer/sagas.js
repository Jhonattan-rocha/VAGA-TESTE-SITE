import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';


function* Arquivos({payload = {}}){
    try{
        if(!payload.filter){
            payload.filter = ""
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.get, `/arquivos/?filter=${encodeURIComponent(payload.filter)}`, payload);
        yield put(actions.ARQUIVO_BUSCAR_SUCCESS({...response.data}));
    }catch(error){
        console.log(error);
        yield put(actions.ARQUIVO_BUSCAR_FALURE({error}));
    }
}

function* CriarArquivos({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type' :'multipart/form-data',
            'Authorization': `Bearer ${token}`
        };
        const formData = new FormData();
        formData.append('originalname', payload.originalname);
        formData.append('filename', payload.filename);
        formData.append('id_dono', payload.id_dono);
        formData.append('id_empresa_dona', payload.id_empresa_dona);
        formData.append('mime_type', payload.mime_type);
        if(payload.id_chamado){
            formData.append('id_chamado', payload.id_chamado);
        }
        formData.append('file', payload.file);
        const response = yield call(axios.post, "/arquivo/", formData);
        yield put(actions.ARQUIVO_CRIAR_SUCCESS({...response.data}));
    }catch(error){
        console.log(error);
        yield put(actions.ARQUIVO_CRIAR_FALURE({...error}));
    }
}

function* EditarArquivo({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.put, `/arquivo/${payload.id}`, payload);
        yield put(actions.ARQUIVO_EDITAR_SUCCESS({...response.data}));
        
    }catch(error){
        console.log(error);
        yield put(actions.ARQUIVO_EDITAR_FALURE({error}));
    }
}

function* DeletarArquivo({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        const response = yield call(axios.delete, `/arquivo/${payload.id}`, payload);
        yield put(actions.ARQUIVO_DELETAR_SUCCESS({...response.data}));
        yield put(actions.ARQUIVO_BUSCAR_REQUEST({filter: 'id_chamado+eq+'+payload.id_chamado}));
    }catch(error){
        console.log(error);
        yield put(actions.ARQUIVO_DELETAR_FALURE({error}));
    }
}


export default all([
    takeLatest(types.ARQUIVO_BUSCAR_REQUEST, Arquivos),
    takeLatest(types.ARQUIVO_CRIAR_REQUEST, CriarArquivos),
    takeLatest(types.ARQUIVO_EDITAR_REQUEST, EditarArquivo),
    takeLatest(types.ARQUIVO_DELETAR_REQUEST, DeletarArquivo),
]);
