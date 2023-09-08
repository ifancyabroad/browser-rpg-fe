import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios from "axios";
import { ISession, IUser } from "common/types";

interface IAuthenticationState {
	sessionChecked: boolean;
	session: boolean;
	user: IUser | null;
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: IAuthenticationState = {
	sessionChecked: false,
	session: false,
	user: null,
	status: "idle",
};

export const fetchSession = createAsyncThunk("authentication/fetchSession", async () => {
	const response = await axios.get<ISession>("/api/auth/session");
	return response.data.session;
});

export const authenticationSelector = (state: RootState) => state.authentication;

export const getSessionChecked = createSelector(authenticationSelector, ({ sessionChecked }) => sessionChecked);

export const authenticationSlice = createSlice({
	name: "authentication",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchSession.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchSession.fulfilled, (state, action) => {
			console.log(action.payload);
			state.status = "succeeded";
			state.session = action.payload;
			state.sessionChecked = true;
		});
		builder.addCase(fetchSession.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
			state.sessionChecked = true;
		});
	},
});

// Action creators are generated for each case reducer function
// export const { } = classesSlice.actions;

export default authenticationSlice.reducer;
