import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios, { AxiosError } from "axios";
import {
	IApiError,
	IBuyItemPayload,
	ICharacter,
	ICharacterClass,
	ICharacterPayload,
	ILevelUpPayload,
	ILocation,
	IPlayerLocation,
	IRoom,
} from "common/types";
import { ACTION_ROOMS, CharacterSheetTab, PropertyType, RoomState, Status, WeaponSize, mapToArray } from "common/utils";
import { fetchBattle, postAction, startBattle } from "features/game";

interface ICharacerState {
	character: ICharacter | null;
	characterStatus: "idle" | "loading" | "succeeded" | "failed";
	classes: ICharacterClass[];
	isCharacterSheetOpen: boolean;
	characterSheetTab: CharacterSheetTab;
	hasViewedItems: boolean;
	path: number[][];
	displayedPath: number[][];
	playerLocation: IPlayerLocation | null;
	currentRoom: IRoom | null;
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: ICharacerState = {
	character: null,
	characterStatus: "idle",
	isCharacterSheetOpen: false,
	characterSheetTab: CharacterSheetTab.Skills,
	hasViewedItems: false,
	path: [],
	displayedPath: [],
	playerLocation: null,
	currentRoom: null,
	classes: [],
	status: "idle",
};

export const fetchCharacter = createAsyncThunk("character/fetchCharacter", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<{ character: ICharacter }>("/api/character");
		return response.data.character;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
});

export const fetchClasses = createAsyncThunk("character/fetchClasses", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<{ classes: ICharacterClass[] }>("/api/character/classes");
		return response.data.classes;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
});

export const createCharacter = createAsyncThunk(
	"character/createCharacter",
	async (payload: ICharacterPayload, { rejectWithValue }) => {
		try {
			const response = await axios.put<{ character: ICharacter }>("/api/character/create", payload);
			return response.data.character;
		} catch (err) {
			const error = err as AxiosError<IApiError>;
			if (!error.response) {
				throw err;
			}
			return rejectWithValue(error.response.data.error);
		}
	},
);

export const retireCharacter = createAsyncThunk("character/retireCharacter", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.post<{ character: ICharacter }>("/api/character/retire");
		return response.data.character;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
});

export const buyItem = createAsyncThunk("character/buy", async (payload: IBuyItemPayload, { rejectWithValue }) => {
	try {
		const response = await axios.post<{ character: ICharacter }>("/api/character/buy", payload);
		return response.data.character;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
});

export const rest = createAsyncThunk("character/rest", async (payload: ILocation, { rejectWithValue }) => {
	try {
		const response = await axios.post<{ character: ICharacter }>("/api/character/rest", payload);
		return response.data.character;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
});

export const levelUp = createAsyncThunk("character/levelUp", async (payload: ILevelUpPayload, { rejectWithValue }) => {
	try {
		const response = await axios.post<{ character: ICharacter }>("/api/character/levelup", payload);
		return response.data.character;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
});

export const move = createAsyncThunk("character/move", async (payload: ILocation, { rejectWithValue }) => {
	try {
		const response = await axios.post<{ character: ICharacter }>("/api/character/move", payload);
		return response.data;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
});

export const nextLevel = createAsyncThunk("character/nextLevel", async (payload: ILocation, { rejectWithValue }) => {
	try {
		const response = await axios.post<{ character: ICharacter }>("/api/character/nextLevel", payload);
		return response.data;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
});

export const characterSelector = (state: RootState) => state.character;

export const getIsLoaded = createSelector(
	characterSelector,
	({ characterStatus }) => characterStatus === "succeeded" || characterStatus === "failed",
);

export const getHasActiveCharacter = createSelector(characterSelector, ({ character }) => {
	return character?.status === Status.Alive;
});

export const getIsTwoHandedWeaponEquipped = createSelector(characterSelector, ({ character }) => {
	return character?.equipment.hand1?.size === WeaponSize.TwoHanded;
});

export const getEquipmentAsArray = createSelector(characterSelector, ({ character }) => {
	if (!character) {
		return [];
	}
	return mapToArray(character.equipment);
});

export const getEquipmentBonus = createSelector(
	getEquipmentAsArray,
	(equipment) => (type: PropertyType, name: string) => {
		return equipment
			.flatMap((item) => (item.properties ? item.properties : []))
			.filter((property) => property.type === type && property.name === name)
			.reduce((n, { value }) => n + value, 0);
	},
);

export const getCurrentLevel = createSelector(characterSelector, ({ character }) => {
	if (!character) {
		return [];
	}
	return character.map.maps[character.map.location.level];
});

export const getCurrentRoom = createSelector(characterSelector, ({ character, currentRoom }) => {
	if (currentRoom) {
		return currentRoom;
	}
	if (!character) {
		return null;
	}
	const { level, x, y } = character.map.location;
	const currentLevel = character.map.maps[level];
	return currentLevel[y][x];
});

export const getIsActiveRoom = createSelector(getCurrentRoom, (currentRoom) => {
	if (!currentRoom) {
		return false;
	}
	return currentRoom.state !== RoomState.Complete && ACTION_ROOMS.includes(currentRoom.type);
});

export const getCurrentLocation = createSelector(getCurrentRoom, (currentRoom) => {
	if (!currentRoom) {
		return null;
	}
	return currentRoom.location;
});

export const getIsInDisplayedPath = createSelector(characterSelector, ({ displayedPath }) => (location: ILocation) => {
	return Boolean(displayedPath.find(([x, y]) => x === location.x && y === location.y));
});

export const characterSlice = createSlice({
	name: "character",
	initialState,
	reducers: {
		openCharacterSheet: (state) => {
			state.isCharacterSheetOpen = true;
		},
		closeCharacterSheet: (state) => {
			state.isCharacterSheetOpen = false;
		},
		setCharacterSheetTab: (state, action: PayloadAction<CharacterSheetTab>) => {
			state.characterSheetTab = action.payload;
		},
		viewItems: (state) => {
			state.hasViewedItems = true;
		},
		newItems: (state) => {
			state.hasViewedItems = false;
		},
		setDisplayedPath: (state, action: PayloadAction<number[][]>) => {
			state.displayedPath = action.payload;
		},
		setPath: (state, action: PayloadAction<number[][]>) => {
			state.path = action.payload;
		},
		setPlayerLocation: (state, action: PayloadAction<IPlayerLocation>) => {
			state.playerLocation = action.payload;
		},
		setCurrentRoom: (state, action: PayloadAction<IRoom>) => {
			state.currentRoom = action.payload;
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
			state.hasViewedItems = false;
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
		builder.addCase(buyItem.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(buyItem.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.character = action.payload;
		});
		builder.addCase(buyItem.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(rest.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(rest.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.character = action.payload;
			state.hasViewedItems = false;
		});
		builder.addCase(rest.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(levelUp.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(levelUp.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.character = action.payload;
		});
		builder.addCase(levelUp.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(move.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(move.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.character = action.payload.character;
		});
		builder.addCase(move.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(nextLevel.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(nextLevel.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.character = action.payload.character;
			state.currentRoom = null;
		});
		builder.addCase(nextLevel.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(startBattle.fulfilled, (state, action) => {
			state.character = action.payload.character;
		});
		builder.addCase(fetchBattle.fulfilled, (state, action) => {
			state.character = action.payload.character;
		});
		builder.addCase(postAction.fulfilled, (state, action) => {
			state.character = action.payload.character;
		});
	},
});

// Action creators are generated for each case reducer function
export const {
	openCharacterSheet,
	closeCharacterSheet,
	setCharacterSheetTab,
	viewItems,
	newItems,
	setDisplayedPath,
	setPath,
	setPlayerLocation,
	setCurrentRoom,
} = characterSlice.actions;

export default characterSlice.reducer;
