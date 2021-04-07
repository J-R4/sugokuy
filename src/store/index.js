import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['bookmarks']
};

const store = createStore(reducer)
const persistor = persistStore(store);

export default {store, persistor}