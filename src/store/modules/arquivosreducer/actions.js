import * as types from '../types'

export function ARQUIVO_CRIAR_REQUEST(payload){
    return {
        type: types.ARQUIVO_CRIAR_REQUEST,
        payload: payload,  
    };
}

export function ARQUIVO_CRIAR_SUCCESS(payload){
    return {
        type: types.ARQUIVO_CRIAR_SUCCESS,
        payload: payload,  
    };
}

export function ARQUIVO_CRIAR_FALURE(payload){
    return {
        type: types.ARQUIVO_CRIAR_FALURE,
        payload: payload,  
    };
}

export function ARQUIVO_EDITAR_REQUEST(payload){
    return {
        type: types.ARQUIVO_EDITAR_REQUEST,
        payload: payload,  
    };
}

export function ARQUIVO_EDITAR_SUCCESS(payload){
    return {
        type: types.ARQUIVO_EDITAR_SUCCESS,
        payload: payload,  
    };
}

export function ARQUIVO_EDITAR_FALURE(payload){
    return {
        type: types.ARQUIVO_CRIAR_FALURE,
        payload: payload,  
    };
}

export function ARQUIVO_DELETAR_REQUEST(payload){
    return {
        type: types.ARQUIVO_DELETAR_REQUEST,
        payload: payload,  
    };
}

export function ARQUIVO_DELETAR_SUCCESS(payload){
    return {
        type: types.ARQUIVO_DELETAR_SUCCESS,
        payload: payload,  
    };
}

export function ARQUIVO_DELETAR_FALURE(payload){
    return {
        type: types.ARQUIVO_DELETAR_FALURE,
        payload: payload,  
    };
}

export function ARQUIVO_BUSCAR_REQUEST(payload){
    return {
        type: types.ARQUIVO_BUSCAR_REQUEST,
        payload: payload,  
    };
}

export function ARQUIVO_BUSCAR_SUCCESS(payload){
    return {
        type: types.ARQUIVO_BUSCAR_SUCCESS,
        payload: payload,  
    };
}

export function ARQUIVO_BUSCAR_FALURE(payload){
    return {
        type: types.ARQUIVO_BUSCAR_FALURE,
        payload: payload,  
    };
}

export function ARQUIVO_DOWNLOAD_REQUEST(payload){
    return {
        type: types.ARQUIVO_DOWNLOAD_REQUEST,
        payload: payload,  
    };
}

export function ARQUIVO_DOWNLOAD_SUCCESS(payload){
    return {
        type: types.ARQUIVO_DOWNLOAD_SUCCESS,
        payload: payload,  
    };
}

export function ARQUIVO_DOWNLOAD_FALURE(payload){
    return {
        type: types.ARQUIVO_DOWNLOAD_FALURE,
        payload: payload,  
    };
}

