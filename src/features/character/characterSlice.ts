import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios from "axios";
import { ICharacter, ICharacterClass, ICharacterPayload } from "common/types";
import { CharacterSheetTab, Status } from "common/utils";

interface ICharacerState {
	character: ICharacter | null;
	characterStatus: "idle" | "loading" | "succeeded" | "failed";
	classes: ICharacterClass[];
	characterSheetTab: CharacterSheetTab;
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: ICharacerState = {
	character: null,
	characterStatus: "idle",
	characterSheetTab: CharacterSheetTab.Skills,
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

export const retireCharacter = createAsyncThunk("character/retireCharacter", async () => {
	const response = await axios.post<{ character: ICharacter }>("/api/character/retire");
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

export const getActiveCharacterKills = createSelector(characterSelector, ({ character }) => {
	return character?.history.filter(({ defeated }) => defeated).length;
});

export const characterSlice = createSlice({
	name: "character",
	initialState,
	reducers: {
		setCharacterSheetTab: (state, action: PayloadAction<CharacterSheetTab>) => {
			state.characterSheetTab = action.payload;
		},
	},
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
		builder.addCase(retireCharacter.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(retireCharacter.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.character = action.payload;
		});
		builder.addCase(retireCharacter.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

// Action creators are generated for each case reducer function
export const { setCharacterSheetTab } = characterSlice.actions;

export default characterSlice.reducer;
