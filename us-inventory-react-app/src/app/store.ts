import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { itemInventoryApi } from '../services/inventoryItems';

export const store = configureStore({
  reducer: {
    [itemInventoryApi.reducerPath]: itemInventoryApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(itemInventoryApi.middleware)
});

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
