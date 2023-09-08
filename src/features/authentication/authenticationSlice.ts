import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios from "axios";
import { ILoginPayload, ISession, IUser } from "common/types";

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

export const login = createAsyncThunk("authentication/login", async (payload: ILoginPayload) => {
	const response = await axios.post<IUser>("/api/auth/login", payload);
	return response.data;
});

export const authenticationSelector = (state: RootState) => state.authentication;

export const getIsLoading = createSelector(authenticationSelector, ({ status }) => status === "loading");

export const authenticationSlice = createSlice({
	name: "authentication",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchSession.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchSession.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.session = action.payload;
			state.sessionChecked = true;
		});
		builder.addCase(fetchSession.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
			state.sessionChecked = true;
		});
		builder.addCase(login.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.user = action.payload;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

// Action creators are generated for each case reducer function
// export const { } = classesSlice.actions;

export default authenticationSlice.reducer;
