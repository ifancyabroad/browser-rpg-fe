import { configureStore } from "@reduxjs/toolkit";
import modalsReducer from "features/modals/modalsSlice";
import authenticationReducer from "features/authentication/authenticationSlice";
import characterReducer from "features/character/characterSlice";
import battleReducer from "features/battle/battleSlice";
import leaderboardReducer from "features/leaderboard/leaderboardSlice";

export const store = configureStore({
	reducer: {
		modals: modalsReducer,
		authentication: authenticationReducer,
		character: characterReducer,
		battle: battleReducer,
		leaderboard: leaderboardReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
