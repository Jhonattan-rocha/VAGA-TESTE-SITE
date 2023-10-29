import * as type from '../types';
import { toast } from 'react-toastify';

const initialState = {
  empresas: {result: ""},
  setores: {result: ""},
  comentarios: {result: ""},
}
// caso precise de mais de um reducer, usar a função combineReducer

export default function recuder(state = initialState, action){
    switch (action.type) {
      case type.EMPRESA_SUCCESS: {
        toast.success("Empresa cadastrada com sucesso")
        return state
      }
      case type.EMPRESA_FALURE: {
        toast.error("Erro ao cadastrar o Empresa")
        return state
      }
      // -----------------
      case type.EMPRESA_EDITAR_SUCCESS: {
        toast.success("Empresa editado com sucesso")
        return state
      }
      case type.EMPRESA_EDITAR_FALURE: {
        toast.error("Erro ao editar o Empresa")
        return state
      }
      // -----------------
      case type.EMPRESA_BUSCAR_SUCCESS: {
        const newState = {...state}
        newState.empresas = action.payload
        return newState
      }
      case type.EMPRESA_BUSCAR_FALURE: {
        toast.error("Erro ao buscar os Empresas")
        return state
      }
      // aqui você pode definir suas ações e como o estado deve ser atualizado
      default:
        return state;
    }
};

