import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios, { AxiosError } from "axios";
import { IApiError, ILoginPayload, IRegisterPayload, ISession, IUser } from "common/types";

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

export const fetchSession = createAsyncThunk("authentication/fetchSession", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<ISession>("/api/auth/session");
		return response.data.session;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
});

export const fetchUser = createAsyncThunk("authentication/fetchUser", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<IUser>("/api/auth/user");
		return response.data;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
});

export const register = createAsyncThunk(
	"authentication/register",
	async (payload: IRegisterPayload, { rejectWithValue }) => {
		try {
			const response = await axios.put<IUser>("/api/auth/register", payload);
			return response.data;
		} catch (err) {
			const error = err as AxiosError<IApiError>;
			if (!error.response) {
				throw err;
			}
			return rejectWithValue(error.response.data.error);
		}
	},
);

export const login = createAsyncThunk("authentication/login", async (payload: ILoginPayload, { rejectWithValue }) => {
	try {
		const response = await axios.post<IUser>("/api/auth/login", payload);
		return response.data;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
});

export const logout = createAsyncThunk("authentication/logout", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.delete<string>("/api/auth/logout");
		return response.data;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
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
		builder.addCase(fetchUser.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.session = true;
			state.user = action.payload;
		});
		builder.addCase(fetchUser.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(register.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(register.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.session = true;
			state.user = action.payload;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(login.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.session = true;
			state.user = action.payload;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(logout.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(logout.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.session = false;
			state.user = null;
		});
		builder.addCase(logout.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

// Action creators are generated for each case reducer function
// export const { } = classesSlice.actions;

export default authenticationSlice.reducer;
