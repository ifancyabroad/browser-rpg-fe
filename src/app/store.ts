import { configureStore } from "@reduxjs/toolkit";
import modalsReducer from "features/modals/modalsSlice";
import authenticationReducer from "features/authentication/authenticationSlice";

export const store = configureStore({
	reducer: {
		modals: modalsReducer,
		authentication: authenticationReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
