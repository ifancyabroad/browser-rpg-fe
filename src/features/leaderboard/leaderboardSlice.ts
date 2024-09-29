import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios, { AxiosError } from "axios";
import { IApiError, ILeaderboardCharacter, ILeaderboardPayload } from "common/types";

interface ILeaderboardState {
	leaderboard: ILeaderboardCharacter[];
	isOpen: boolean;
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: ILeaderboardState = {
	leaderboard: [],
	isOpen: false,
	status: "idle",
};

export const fetchLeaderboard = createAsyncThunk(
	"battle/fetchLeaderboard",
	async (payload: ILeaderboardPayload | void, { rejectWithValue }) => {
		try {
			const response = await axios.get<{ leaderboard: ILeaderboardCharacter[] }>("/api/leaderboard", {
				params: payload,
			});
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

export const leaderboardSelector = (state: RootState) => state.leaderboard;

export const leaderboardSlice = createSlice({
	name: "leaderboard",
	initialState,
	reducers: {
		openLeaderboard: (state) => {
			state.isOpen = true;
		},
		closeLeaderboard: (state) => {
			state.isOpen = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchLeaderboard.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchLeaderboard.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.leaderboard = action.payload.leaderboard;
		});
		builder.addCase(fetchLeaderboard.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

// Action creators are generated for each case reducer function
export const { openLeaderboard, closeLeaderboard } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
