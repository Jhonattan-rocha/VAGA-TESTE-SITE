import history from '../../../services/history';
import * as type from '../types';
import { toast } from 'react-toastify';

const initialState = {
    isLoggedIn: false,
    token: false,
    user: {},
    isLoading: false,
    usuarios: {result: []}
}
// caso precise de mais de um reducer, usar a função combineReducer

export default function recuder(state = initialState, action){
    switch (action.type) {
        case type.LOGIN_SUCCESS: {
            const newState = {...state}
            newState.token = action.payload.token
            newState.user = action.payload.user
            newState.isLoggedIn = true
            return newState;
        }

        case type.LOGIN_FALURE: {
            toast.error("Email ou senha inválidos")
            const newState = initialState
            return newState
        }

        case type.LOGOUT: {
            const newState = initialState;
            history.push("/Login", newState);
            toast.success("Loguot feito com sucesso");
            return newState;
        }

        case type.USUARIO_BUSCAR_SUCCESS: {
            const newState = {...state}
            newState.usuarios = action.payload;
            return newState;
        }

      // aqui você pode definir suas ações e como o estado deve ser atualizado
      default:
        return state;
    }
};

