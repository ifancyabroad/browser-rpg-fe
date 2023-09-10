import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios from "axios";
import { ICharacter, ICharacterClass, ICharacterPayload } from "common/types";
import { Status } from "common/utils";

interface ICharacerState {
	character: ICharacter | null;
	characterStatus: "idle" | "loading" | "succeeded" | "failed";
	classes: ICharacterClass[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: ICharacerState = {
	character: null,
	characterStatus: "idle",
	classes: [],
	status: "idle",
};

export const fetchCharacter = createAsyncThunk("character/fetchCharacter", async () => {
	const response = await axios.get<{ character: ICharacter }>("/api/character");
	return response.data.character;
});

export const fetchClasses = createAsyncThunk("character/fetchClasses", async () => {
	const response = await axios.get<{ classes: ICharacterClass[] }>("/api/character/classes");
	return response.data.classes;
});

export const createCharacter = createAsyncThunk("character/createCharacter", async (payload: ICharacterPayload) => {
	const response = await axios.put<{ character: ICharacter }>("/api/character/create", payload);
	return response.data.character;
});

export const characterSelector = (state: RootState) => state.character;

export const getIsLoaded = createSelector(
	characterSelector,
	({ characterStatus }) => characterStatus === "succeeded" || characterStatus === "failed",
);

export const getHasActiveCharacter = createSelector(characterSelector, ({ character }) => {
	return character?.status === Status.Alive;
});

export const characterSlice = createSlice({
	name: "character",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCharacter.pending, (state) => {
			state.characterStatus = "loading";
		});
		builder.addCase(fetchCharacter.fulfilled, (state, action) => {
			state.characterStatus = "succeeded";
			state.character = action.payload;
		});
		builder.addCase(fetchCharacter.rejected, (state, action) => {
			state.characterStatus = "failed";
			state.error = action.error.message;
		});
		builder.addCase(fetchClasses.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchClasses.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.classes = action.payload;
		});
		builder.addCase(fetchClasses.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(createCharacter.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(createCharacter.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.character = action.payload;
		});
		builder.addCase(createCharacter.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

// Action creators are generated for each case reducer function
// export const { } = classesSlice.actions;

export default characterSlice.reducer;
