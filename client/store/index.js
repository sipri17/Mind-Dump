import {legacy_createStore as createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers/rootReducers';



export default createStore(rootReducers, applyMiddleware(thunk))













