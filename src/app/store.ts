import {Action, combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import {postsReducer} from "..//features/posts/postsSlice";

const persistConfig = {
  key:'root',
  storage,
  version:1
}


const reducer = combineReducers({
  // counter: counterReducer,
  posts: postsReducer,

})

const persistedReducer = persistReducer(persistConfig,reducer)

export const store = configureStore({
  reducer: persistedReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
