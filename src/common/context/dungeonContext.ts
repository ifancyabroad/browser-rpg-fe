import { ZoneModalType } from "common/utils";
import { createContext, Dispatch, useContext } from "react";

type TDungeonModalAction =
	| {
			type: "OPEN";
			payload: ZoneModalType;
	  }
	| {
			type: "CLOSE";
	  };

export interface IDungeonModalState {
	[ZoneModalType.Battle]: boolean;
	[ZoneModalType.Boss]: boolean;
	[ZoneModalType.Shop]: boolean;
	[ZoneModalType.Treasure]: boolean;
	[ZoneModalType.Rest]: boolean;
	[ZoneModalType.Exit]: boolean;
}

export const initialState: IDungeonModalState = {
	[ZoneModalType.Battle]: false,
	[ZoneModalType.Boss]: false,
	[ZoneModalType.Shop]: false,
	[ZoneModalType.Treasure]: false,
	[ZoneModalType.Rest]: false,
	[ZoneModalType.Exit]: false,
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
