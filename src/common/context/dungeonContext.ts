import { RoomType } from "common/utils";
import { createContext, Dispatch, useContext } from "react";

type TDungeonModalAction =
	| {
			type: "OPEN";
			payload: RoomType;
	  }
	| {
			type: "CLOSE";
	  };

export interface IDungeonModalState {
	[RoomType.Battle]: boolean;
	[RoomType.Boss]: boolean;
	[RoomType.Shop]: boolean;
	[RoomType.Treasure]: boolean;
	[RoomType.Rest]: boolean;
	[RoomType.Exit]: boolean;
}

export const initialState: IDungeonModalState = {
	[RoomType.Battle]: false,
	[RoomType.Boss]: false,
	[RoomType.Shop]: false,
	[RoomType.Treasure]: false,
	[RoomType.Rest]: false,
	[RoomType.Exit]: false,
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
