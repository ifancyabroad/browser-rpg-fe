import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios from "axios";
import { IActionPayload, IBattle, ICharacter } from "common/types";

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
	return response.data;
});

export const fetchBattle = createAsyncThunk("battle/fetchBattle", async () => {
	const response = await axios.get<{ battle: IBattle; character: ICharacter }>("/api/battle");
	return response.data;
});

export const completeBattle = createAsyncThunk("battle/completeBattle", async () => {
	const response = await axios.post<{ character: ICharacter }>("/api/battle/complete");
	return response.data;
});

export const postAction = createAsyncThunk("battle/postAction", async (payload: IActionPayload) => {
	const response = await axios.post<{ battle: IBattle; character: ICharacter }>("/api/battle/action", payload);
	return response.data;
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
			state.battle = action.payload.battle;
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
			state.battle = action.payload.battle;
		});
		builder.addCase(fetchBattle.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(completeBattle.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(completeBattle.fulfilled, (state) => {
			state.status = "succeeded";
		});
		builder.addCase(completeBattle.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(postAction.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(postAction.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.battle = action.payload.battle;
		});
		builder.addCase(postAction.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

// Action creators are generated for each case reducer function
// export const { } = gameSlice.actions;

export default gameSlice.reducer;
