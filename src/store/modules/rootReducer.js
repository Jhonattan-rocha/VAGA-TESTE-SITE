import { combineReducers } from 'redux';
import arquivosreducer from './arquivosreducer/reducer';
import empresareducer from './empresareducer/reducer';
import authreducer from './authReducer/reducer';

export default combineReducers({
    arquivosreducer: arquivosreducer,
    authreducer: authreducer,
    empresareducer: empresareducer,
});
