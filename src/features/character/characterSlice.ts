import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios, { AxiosError } from "axios";
import {
	IApiError,
	IBuyItemPayload,
	IBuyPotionPayload,
	ICharacter,
	ICharacterClass,
	ICharacterPayload,
	ILevelUpPayload,
	IProgress,
} from "common/types";
import { CharacterSheetTab, getItemPropertyBonus, PropertyType, Status, WeaponSize } from "common/utils";
import { fetchBattle, postAction, returnToTown, startBattle, takeTreasure } from "features/battle";

interface ICharacterState {
	character: ICharacter | null;
	characters: ICharacter[];
	classes: ICharacterClass[];
	progress: IProgress | null;
	isCharacterSheetOpen: boolean;
	characterSheetTab: CharacterSheetTab;
	hasViewedItems: boolean;
	status: "idle" | "loading" | "succeeded" | "failed";
	characterStatus: "idle" | "loading" | "succeeded" | "failed";
	classesStatus: "idle" | "loading" | "succeeded" | "failed";
	progressStatus: "idle" | "loading" | "succeeded" | "failed";
	characterByIDStatus: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: ICharacterState = {
	character: null,
	characters: [],
	isCharacterSheetOpen: false,
	characterSheetTab: CharacterSheetTab.Details,
	hasViewedItems: false,
	classes: [],
	progress: null,
	status: "idle",
	characterStatus: "idle",
	classesStatus: "idle",
	progressStatus: "idle",
	characterByIDStatus: "idle",
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

export const restockItems = createAsyncThunk("character/restockItems", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.post<{ character: ICharacter }>("/api/character/restock");
		return response.data.character;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
});

export const buyPotion = createAsyncThunk(
	"character/buyPotion",
	async (payload: IBuyPotionPayload, { rejectWithValue }) => {
		try {
			const response = await axios.post<{ character: ICharacter }>("/api/character/buyPotion", payload);
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

export const rest = createAsyncThunk("character/rest", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.post<{ character: ICharacter }>("/api/character/rest");
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

export const swapWeapons = createAsyncThunk("character/swapWeapons", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.post<{ character: ICharacter }>("/api/character/swapWeapons");
		return response.data.character;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
});

export const fetchProgress = createAsyncThunk("character/fetchProgress", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<{ progress: IProgress }>("/api/character/progress");
		return response.data.progress;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
});

export const fetchCharacterByID = createAsyncThunk(
	"character/fetchCharacterByID",
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axios.get<{ character: ICharacter }>(`/api/character/${id}`);
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
	return character?.equipmentAsArray ?? [];
});

export const getBaseArmourClass = createSelector(characterSelector, ({ character }) => {
	return character?.equipment.body?.armourClass ?? 0;
});

export const getLevelUpAvailable = createSelector(characterSelector, ({ character }) => {
	if (!character) {
		return false;
	}
	const { experience, nextLevelExperience } = character;
	if (!nextLevelExperience) {
		return false;
	}
	return experience >= nextLevelExperience;
});

export const getEquipmentBonus = createSelector(
	getEquipmentAsArray,
	(equipment) => (type: PropertyType, name: string) => {
		return equipment.map((item) => getItemPropertyBonus(item, type, name)).filter(({ value }) => value !== 0);
	},
);

export const getCanSwapWeapons = createSelector(characterSelector, ({ character }) => {
	if (!character) {
		return false;
	}
	const hand1 = character.equipment.hand1;
	const hand2 = character.equipment.hand2;
	if (!hand1 || !hand2) {
		return false;
	}
	const isHand1OneHanded = hand1.size === WeaponSize.OneHanded;
	const isHand2OneHanded = "size" in hand2 && hand2.size === WeaponSize.OneHanded;
	return isHand1OneHanded && isHand2OneHanded;
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
			state.classesStatus = "loading";
		});
		builder.addCase(fetchClasses.fulfilled, (state, action) => {
			state.classesStatus = "succeeded";
			state.classes = action.payload;
		});
		builder.addCase(fetchClasses.rejected, (state, action) => {
			state.classesStatus = "failed";
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
		builder.addCase(restockItems.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(restockItems.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.character = action.payload;
		});
		builder.addCase(restockItems.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(buyPotion.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(buyPotion.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.character = action.payload;
		});
		builder.addCase(buyPotion.rejected, (state, action) => {
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
		builder.addCase(swapWeapons.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(swapWeapons.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.character = action.payload;
		});
		builder.addCase(swapWeapons.rejected, (state, action) => {
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
		builder.addCase(takeTreasure.fulfilled, (state, action) => {
			state.character = action.payload.character;
		});
		builder.addCase(returnToTown.fulfilled, (state, action) => {
			state.character = action.payload.character;
		});
		builder.addCase(fetchProgress.pending, (state) => {
			state.progressStatus = "loading";
		});
		builder.addCase(fetchProgress.fulfilled, (state, action) => {
			state.progressStatus = "succeeded";
			state.progress = action.payload;
		});
		builder.addCase(fetchProgress.rejected, (state, action) => {
			state.progressStatus = "failed";
			state.error = action.error.message;
		});
		builder.addCase(fetchCharacterByID.pending, (state) => {
			state.characterByIDStatus = "loading";
		});
		builder.addCase(fetchCharacterByID.fulfilled, (state, action) => {
			state.characterByIDStatus = "succeeded";
			state.characters = [...state.characters, action.payload];
		});
		builder.addCase(fetchCharacterByID.rejected, (state, action) => {
			state.characterByIDStatus = "failed";
			state.error = action.error.message;
		});
	},
});

// Action creators are generated for each case reducer function
export const { openCharacterSheet, closeCharacterSheet, setCharacterSheetTab, viewItems, newItems } =
	characterSlice.actions;

export default characterSlice.reducer;
