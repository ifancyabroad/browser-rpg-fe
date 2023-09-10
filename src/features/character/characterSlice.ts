import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios from "axios";
import { ICharacter } from "common/types";
import { Status } from "common/utils";

interface ICharacerState {
	character: ICharacter | null;
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: ICharacerState = {
	character: null,
	status: "idle",
};

export const fetchCharacter = createAsyncThunk("character/fetchCharacter", async () => {
	const response = await axios.get<ICharacter>("/api/character");
	return response.data;
});

export const characterSelector = (state: RootState) => state.character;

export const getIsLoaded = createSelector(
	characterSelector,
	({ status }) => status === "succeeded" || status === "failed",
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
			state.status = "loading";
		});
		builder.addCase(fetchCharacter.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.character = action.payload;
		});
		builder.addCase(fetchCharacter.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

// Action creators are generated for each case reducer function
// export const { } = classesSlice.actions;

export default characterSlice.reducer;
