import * as types from '../types'

export function EMPRESAREQUEST(payload){
    return {
        type: types.EMPRESA_REQUEST,
        payload: payload,  
    };
}

export function EMPRESASUCCESS(payload){
    return {
        type: types.EMPRESA_SUCCESS,
        payload: payload,  
    };
}

export function EMPRESAFALURE(payload){
    return {
        type: types.EMPRESA_FALURE,
        payload: payload,  
    };
}

// -------------------------------------

export function EMPRESA_EDITARREQUEST(payload){
    return {
        type: types.EMPRESA_EDITAR_REQUEST,
        payload: payload,  
    };
}

export function EMPRESA_EDITARSUCCESS(payload){
    return {
        type: types.EMPRESA_EDITAR_SUCCESS,
        payload: payload,  
    };
}

export function EMPRESA_EDITARFALURE(payload){
    return {
        type: types.EMPRESA_EDITAR_FALURE,
        payload: payload,  
    };
}

// -------------------------------------------------------------

export function EMPRESA_BUSCARREQUEST(payload){
    return {
        type: types.EMPRESA_BUSCAR_REQUEST,
        payload: payload,  
    };
}

export function EMPRESA_BUSCARSUCCESS(payload){
    return {
        type: types.EMPRESA_BUSCAR_SUCCESS,
        payload: payload,  
    };
}

export function EMPRESA_BUSCARFALURE(payload){
    return {
        type: types.EMPRESA_BUSCAR_FALURE,
        payload: payload,  
    };
}

// -----------

export function EMPRESA_CRIAR_COM_FOTO(payload){
    return {
        type: types.EMPRESA_CRIAR_COM_FOTO,
        payload: payload,  
    };
}

export function EMPRESA_EDITAR_COM_FOTO(payload){
    return {
        type: types.EMPRESA_EDITAR_COM_FOTO,
        payload: payload,  
    };
}

// -------------------------------------------------

export function EMPRESA_DELETAR_REQUEST(payload){
    return {
        type: types.EMPRESA_DELETAR_REQUEST,
        payload: payload,  
    };
}

export function EMPRESA_DELETAR_SUCCESS(payload){
    return {
        type: types.EMPRESA_DELETAR_SUCCESS,
        payload: payload,  
    };
}

export function EMPRESA_DELETAR_FALURE(payload){
    return {
        type: types.EMPRESA_DELETAR_FALURE,
        payload: payload,  
    };
}
