import * as type from '../types';
import { toast } from 'react-toastify';

const initialState = {
  arquivos: {result: ""},
}
// caso precise de mais de um reducer, usar a função combineReducer

export default function recuder(state = initialState, action){
    switch (action.type) {
      case type.ARQUIVO_BUSCAR_SUCCESS: {
        toast.success("Anexos encontrados");
        const newState = { ...state }
        newState.arquivos = action.payload;
        return newState
      }
      case type.ARQUIVO_BUSCAR_FALURE: {
        toast.error("Erro ao buscar os anexos")
        return state
      }
      // aqui você pode definir suas ações e como o estado deve ser atualizado
      default:
        return state;
    }
};

