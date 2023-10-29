import * as types from '../types'

export function Login(payload){
    return {
        type: types.LOGIN_REQUEST,
        payload: payload,  
    };
}

export function Loguot(){
    return {
        type: types.LOGOUT,
    };
}

export function LoginFalure(payload){
    return  {
        type: types.LOGIN_FALURE,
        payload: payload,
    };
}

export function LoginSuccess(payload){
    return  {
        type: types.LOGIN_SUCCESS,
        payload: payload,
    };
}

export const setAuthToken = (payload) => {
    return {
      type: types.PERSIST_TOKEN,
      token: payload,
    };
};
  

export function USUARIO_BUSCARREQUEST(payload){
    return {
        type: types.USUARIO_BUSCAR_REQUEST,
        payload: payload,  
    };
}

export function USUARIO_BUSCARSUCCESS(payload){
    return {
        type: types.USUARIO_BUSCAR_SUCCESS,
        payload: payload,  
    };
}

export function USUARIO_BUSCARFALURE(payload){
    return {
        type: types.USUARIO_BUSCAR_FALURE,
        payload: payload,  
    };
}
