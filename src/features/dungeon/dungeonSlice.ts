import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ILocation, IPlayerLocation, IRoom } from "common/types";
import { ACTION_ROOMS, RoomState } from "common/utils";
import { startBattle } from "features/battle";
import { buyItem, characterSelector, getTreasure, nextLevel, rest, takeTreasure } from "features/character";

interface IDungeonState {
	path: number[][];
	displayedPath: number[][];
	playerLocation: IPlayerLocation | null;
	currentRoom: IRoom | null;
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: IDungeonState = {
	path: [],
	displayedPath: [],
	playerLocation: null,
	currentRoom: null,
	status: "idle",
};

export const dungeonSelector = (state: RootState) => state.dungeon;

export const getActualLevel = createSelector(characterSelector, ({ character }) => {
	if (!character) {
		return [];
	}
	return character.map.maps[character.map.location.level];
});

export const getActualRoom = createSelector(characterSelector, ({ character }) => {
	if (!character) {
		return null;
	}
	const { level, x, y } = character.map.location;
	return character.map.maps[level][y][x];
});

export const getCurrentRoom = createSelector(dungeonSelector, getActualRoom, ({ currentRoom }, actualRoom) => {
	return currentRoom ?? actualRoom;
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

export const getIsInDisplayedPath = createSelector(dungeonSelector, ({ displayedPath }) => (location: ILocation) => {
	return Boolean(displayedPath.find(([x, y]) => x === location.x && y === location.y));
});

export const dungeonSlice = createSlice({
	name: "dungeon",
	initialState,
	reducers: {
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
		builder.addCase(rest.fulfilled, (state) => {
			state.currentRoom = null;
		});
		builder.addCase(startBattle.fulfilled, (state) => {
			state.currentRoom = null;
		});
		builder.addCase(buyItem.fulfilled, (state) => {
			state.currentRoom = null;
		});
		builder.addCase(nextLevel.fulfilled, (state) => {
			state.currentRoom = null;
		});
		builder.addCase(getTreasure.fulfilled, (state) => {
			state.currentRoom = null;
		});
		builder.addCase(takeTreasure.fulfilled, (state) => {
			state.currentRoom = null;
		});
	},
});

// Action creators are generated for each case reducer function
export const { setDisplayedPath, setPath, setPlayerLocation, setCurrentRoom } = dungeonSlice.actions;

export default dungeonSlice.reducer;
