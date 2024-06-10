import { styled } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { useReducer } from "react";
import { DungeonContext, dungeonReducer, initialState } from "common/context";
import { RoomModals } from "./RoomModals";
import { RoomWindow } from "./RoomWindow";
import { CharacterButton } from "common/components";
import { Map } from "./Map";

const Wrapper = styled("div")({
	position: "relative",
	flex: 1,
	display: "flex",
	flexDirection: "column",
	width: "100%",
	height: "100%",
	overflow: "hidden",
});

export const Dungeon: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);
	const [state, localDispatch] = useReducer(dungeonReducer, initialState);
	const providerState = { state, dispatch: localDispatch };

	if (!character) {
		return null;
	}

	return (
		<DungeonContext.Provider value={providerState}>
			<Wrapper>
				<CharacterButton />
				<RoomWindow />
				<Map />
			</Wrapper>

			<RoomModals />
		</DungeonContext.Provider>
	);
};
