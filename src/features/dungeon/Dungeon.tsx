import { styled } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { useCallback, useReducer, useState } from "react";
import { DungeonContext, dungeonReducer, initialState } from "common/context";
import { RoomModals } from "./RoomModals";
import { RoomWindow } from "./RoomWindow";
import { CharacterButton, Loader } from "common/components";
import { Map } from "./Map";

const Wrapper = styled("div")({
	position: "relative",
	flex: 1,
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
	height: "100%",
	overflow: "hidden",
});

export const Dungeon: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);
	const [state, localDispatch] = useReducer(dungeonReducer, initialState);
	const providerState = { state, dispatch: localDispatch };
	const [elementRect, setElementRect] = useState<DOMRect | null>(null);

	const handleRect = useCallback((node: HTMLDivElement | null) => {
		if (node) {
			setElementRect(node.getBoundingClientRect());
		}
	}, []);

	if (!character) {
		return null;
	}

	return (
		<DungeonContext.Provider value={providerState}>
			<Wrapper ref={handleRect}>
				<CharacterButton />
				<RoomWindow />
				{elementRect ? <Map height={elementRect.height} width={elementRect.width} /> : <Loader />}
			</Wrapper>

			<RoomModals />
		</DungeonContext.Provider>
	);
};
