import { TileType } from "common/utils";
import { createContext, Dispatch, useContext } from "react";

type TDungeonModalAction =
	| {
			type: "OPEN";
			payload: TileType;
	  }
	| {
			type: "CLOSE";
	  };

export interface IDungeonModalState {
	[TileType.Merchant]: boolean;
	[TileType.Rest]: boolean;
	[TileType.Hut]: boolean;
	[TileType.Exit]: boolean;
	[TileType.Leaderboard]: boolean;
	[TileType.Salvage]: boolean;
	[TileType.Spirits]: boolean;
}

export const initialState: IDungeonModalState = {
	[TileType.Merchant]: false,
	[TileType.Rest]: false,
	[TileType.Hut]: false,
	[TileType.Exit]: false,
	[TileType.Leaderboard]: false,
	[TileType.Salvage]: false,
	[TileType.Spirits]: false,
};

export const dungeonReducer = (state: IDungeonModalState, action: TDungeonModalAction) => {
	switch (action.type) {
		case "OPEN":
			return {
				...state,
				[action.payload]: true,
			};
		case "CLOSE":
			return initialState;
		default:
			throw Error("Unknown action");
	}
};

interface IContextProps {
	state: IDungeonModalState;
	dispatch: Dispatch<TDungeonModalAction>;
}

export const DungeonContext = createContext<IContextProps | null>(null);

export const useDungeonContext = () => {
	const dungeonContext = useContext(DungeonContext);
	if (!dungeonContext) {
		throw new Error("No DungeonContext.Provider found when calling useDungeonContext.");
	}
	return dungeonContext;
};
