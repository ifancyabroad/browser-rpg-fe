import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IMapData, IRoom, IPlayerData } from "common/types";
import { ACTION_ROOMS, RoomState, TILE_SIZE, getMapTile } from "common/utils";
import { startBattle } from "features/battle";
import { buyItem, characterSelector, getTreasure, nextLevel, rest, takeTreasure } from "features/character";

interface IDungeonState {
	currentRoom: IRoom | null;
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: IDungeonState = {
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

export const getTreasureByLocation = createSelector(
	characterSelector,
	getCurrentLocation,
	({ character }, currentLocation) => {
		return character?.map.treasure.find(
			({ location }) =>
				location.level === currentLocation?.level &&
				location.x === currentLocation.x &&
				location.y === currentLocation.y,
		);
	},
);

export const getMapData = createSelector(characterSelector, ({ character }) => {
	if (!character) {
		return null;
	}
	return {
		tsize: TILE_SIZE,
		maps: character.map.maps.map((map) => map.map((row) => row.map(getMapTile))),
	} as IMapData;
});

export const getPlayerData = createSelector(characterSelector, getCurrentLocation, ({ character }, currentLocation) => {
	if (!character) {
		return null;
	}
	return {
		icon: character.characterClass.icon,
		location: currentLocation,
	} as IPlayerData;
});

export const dungeonSlice = createSlice({
	name: "dungeon",
	initialState,
	reducers: {
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
export const { setCurrentRoom } = dungeonSlice.actions;

export default dungeonSlice.reducer;
