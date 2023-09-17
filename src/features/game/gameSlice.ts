import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios from "axios";
import { IBattle, ICharacter } from "common/types";

interface IGameState {
	battle: IBattle | null;
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: IGameState = {
	battle: null,
	status: "idle",
};

export const startBattle = createAsyncThunk("battle/startBattle", async () => {
	const response = await axios.post<{ battle: IBattle; character: ICharacter }>("/api/battle/start");
	return response.data.battle;
});

export const fetchBattle = createAsyncThunk("battle/fetchBattle", async () => {
	const response = await axios.get<{ battle: IBattle; character: ICharacter }>("/api/battle");
	return response.data.battle;
});

export const gameSelector = (state: RootState) => state.game;

export const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(startBattle.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(startBattle.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.battle = action.payload;
		});
		builder.addCase(startBattle.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(fetchBattle.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchBattle.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.battle = action.payload;
		});
		builder.addCase(fetchBattle.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

// Action creators are generated for each case reducer function
// export const { } = gameSlice.actions;

export default gameSlice.reducer;
